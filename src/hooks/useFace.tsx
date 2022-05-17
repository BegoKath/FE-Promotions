import * as faceapi from "face-api.js";

import { useSelector, useDispatch } from "react-redux";
import { IFaceRecognitionState } from "../screens/FaceRecognitionScreen/redux-reducers/faceRecognitionReducer";
import { FacesService } from "../services/FacesService";
import {
  faceRecognitionLoadFaces,
  faceRecognitionHideLoginView,
  faceRecognitionToggleFail,
  faceRecognitionToggleLoading,
  faceRecognitionTogglePhotoSrc,
  faceRecognitionSaveCapture,
  faceRecognitionReset,
  faceRecognitionClearCaptures,
} from "../screens/FaceRecognitionScreen/redux-actions/faceRecognitionActions";
import { Alert } from "../utils/Alert";
import { Globals } from "../global/Globals";
import { useAuth } from "./useAuth";
import { store } from "../redux/store";
import { IUserFaceInfo } from "../interfaces/IUserFaceInfo";
import { useNavigate } from "react-router-dom";

export const useFace = (props: {
  canvasPhotoRef: any;
  canvasFaceRef: any;
  webcamRef: any;
  width: number;
  height: number;
}) => {
  const { canvasFaceRef, canvasPhotoRef, webcamRef, width, height } = props;
  const state = useSelector(
    (state: any) => state.faceRecognition
  ) as IFaceRecognitionState;
  const { logInWithId } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ERROR_FACE_DETECTION =
    "No se ha detectado ninguna cara en la imagen, por favor vuelva a tomar la foto";

  let detection: any;

  const handleChanges = () => {
    store.subscribe(async () => {
      const currentState = store.getState().faceRecognition;

      if (
        !currentState.loading &&
        Globals.getIdUser &&
        currentState.faceCaptures.length >= 3
      ) {
        dispatch(faceRecognitionToggleLoading(true));
        const res = await FacesService.registerFaces(
          currentState.faceCaptures[0],
          currentState.faceCaptures[1],
          currentState.faceCaptures[2]
        );
        dispatch(faceRecognitionClearCaptures());
        dispatch(faceRecognitionToggleLoading(false));
        if (!res.correctProcess) {
          await Alert.showError(res.message);
        } else {
          await Alert.showSuccess(res.message);
          navigate("/dashboard");
        }
      }
    });
  };

  const initializeScreen = async () => {
    dispatch(faceRecognitionReset());
    const modelsResponse = await loadModels();
    if (typeof modelsResponse === "string") {
      dispatch(faceRecognitionToggleLoading(false));
      showInitialError(modelsResponse);
      return;
    }
    if (!Globals.getIdUser) {
      loadFaces();
    } else {
      hideLoginView();
    }
  };

  const loadModels = async (): Promise<string | any> => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/FaceApiModels");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/FaceApiModels");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/FaceApiModels");
    } catch (err) {
      return err;
    }
  };

  const loadFaces = async () => {
    !state.loading && dispatch(faceRecognitionToggleLoading(true));
    const res = await FacesService.loadFaces();
    dispatch(faceRecognitionToggleLoading(false));
    if (!res.correctProcess) {
      showInitialError(res.message);
    } else {
      const facesData = res.data.map((e: IUserFaceInfo) => {
        let descriptors = [];
        if (e.clfFace1) descriptors.push(e.clfFace1);
        if (e.clfFace2) descriptors.push(e.clfFace2);
        if (e.clfFace3) descriptors.push(e.clfFace3);
        return {
          idUser: e.idCliente!,
          descriptors,
        };
      });
      dispatch(faceRecognitionLoadFaces(facesData));
    }
  };

  const hideLoginView = () => {
    dispatch(faceRecognitionToggleLoading(false));
    dispatch(faceRecognitionHideLoginView());
  };

  const showInitialError = (message: string) => {
    Alert.showError(message);
    dispatch(faceRecognitionToggleFail(true));
  };

  const clearPhoto = () => {
    if (canvasPhotoRef.current) {
      const context = canvasPhotoRef.current.getContext("2d");
      context.clearRect(
        0,
        0,
        canvasPhotoRef.current.width,
        canvasPhotoRef.current.height
      );
    }
  };

  const clearFaceDraw = () => {
    if (canvasFaceRef.current) {
      const context = canvasFaceRef.current.getContext("2d");
      context.clearRect(
        0,
        0,
        canvasFaceRef.current.width,
        canvasFaceRef.current.height
      );
    }
  };

  const loadLabelFaces = () => {
    const { allUserFaces: faces } = state;
    return faces.map((faceData) => {
      const descriptors = faceData.descriptors.map(
        (e) => new Float32Array(JSON.parse(e))
      );
      return new faceapi.LabeledFaceDescriptors(
        `${faceData.idUser}`,
        descriptors
      );
    });
  };

  const getMatchingUserId = (): number | undefined => {
    if (loadLabelFaces().length > 0) {
      const faceMatcher = new faceapi.FaceMatcher(loadLabelFaces(), 0.9);
      const result = faceMatcher.findBestMatch(detection.descriptor);
      if (result.distance < 0.4) {
        return Number(result.label);
      }
    }
  };

  const startRecognizing = async (image: any) => {
    if (!image) return;

    detection = await faceapi
      .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      const idUser = getMatchingUserId();

      if (idUser && !Globals.getIdUser) {
        logInWithId(idUser);
      }

      drawDetections(detection, image);
    } else {
      clearFaceDraw();
    }
  };

  const drawDetections = (
    detection: faceapi.WithFaceDescriptor<
      faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
      >
    >,
    image: any
  ) => {
    if (image && canvasFaceRef.current) {
      canvasFaceRef.current.innerHtml = faceapi.createCanvas(image);
      faceapi.matchDimensions(canvasFaceRef.current, { width, height });
      const resizedDetection = faceapi.resizeResults(detection.detection, {
        width,
        height,
      });

      const drawOptions = {
        lineWidth: 2,
        boxColor: "#37DE27",
      };
      const drawBox = new faceapi.draw.DrawBox(
        resizedDetection.box,
        drawOptions
      );
      drawBox.draw(canvasFaceRef.current);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      let video = webcamRef.current;
      if (!video) return;
      video.srcObject = stream;
      video.play();

      video.addEventListener("play", () => {
        setTimeout(() => {
          setInterval(() => {
            if (webcamRef.current) {
              startRecognizing(webcamRef.current);
              return;
            }
          }, 100);
        }, 3000);
      });
    } catch (error) {
      showInitialError(`${error}`);
    }
  };

  const takePhoto = () => {
    if (state.photoSrc) {
      dispatch(faceRecognitionTogglePhotoSrc(undefined));
      return;
    }
    if (!detection) {
      Alert.showError(ERROR_FACE_DETECTION);
      return;
    }
    canvasPhotoRef.current
      .getContext("2d")
      .drawImage(
        webcamRef.current,
        0,
        0,
        webcamRef.current.width,
        webcamRef.current.height
      );
    var data = canvasPhotoRef.current.toDataURL("image/png");
    dispatch(faceRecognitionTogglePhotoSrc(data));
  };

  const saveFace = () => {
    if (!Globals.getIdUser) {
      Alert.showError(
        "No existe información de ningún usuario, por favor inicie sesión"
      );
      return;
    }

    if (!detection) {
      Alert.showError(ERROR_FACE_DETECTION);
      return;
    }

    const original = detection.descriptor;
    const jsonDescriptor = JSON.stringify(Array.from(original));

    dispatch(faceRecognitionSaveCapture(jsonDescriptor));
    dispatch(faceRecognitionTogglePhotoSrc(undefined));
  };

  return {
    state,
    clearFaceDraw,
    clearPhoto,
    handleChanges,
    initializeScreen,
    saveFace,
    startCamera,
    startRecognizing,
    takePhoto,
  };
};
