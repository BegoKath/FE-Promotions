import { IReduxAction } from '../../../interfaces/IReduxAction';
import { FACE_RECOGNITION_TOGGLE_PHOTO_SRC, FACE_RECOGNITION_SAVE_CAPTURE, FACE_RECOGNITION_LOAD_FACES, FACE_RECOGNITION_HIDE_LOGIN_VIEW, FACE_RECOGNITION_TOGGLE_FAIL, FACE_RECOGNITION_TOGGLE_LOADING, FACE_RECOGNITION_RESET, FACE_RECOGNITION_CLEAR_CAPTURES } from '../redux-actions/faceRecognitionActions';
import { IFaceData } from '../../../interfaces/IFaceData';
import { LOGIN_TOGGLE_LOADING } from '../../LoginScreen/redux-actions/loginActions';

export interface IFaceRecognitionState {
  allUserFaces: IFaceData[];
  faceCaptures: string[];
  failed: boolean;
  loading: boolean;
  logging: boolean;
  photoSrc?: any;
  showLoginView: boolean;
}

const initialState: IFaceRecognitionState = {
  allUserFaces: [],
  faceCaptures: [],
  failed: false,
  loading: true,
  logging: false,
  showLoginView: true,
}

export const faceRecognitionReducer = (state: IFaceRecognitionState = initialState, action: IReduxAction): IFaceRecognitionState => {
  switch (action.type) {
    case FACE_RECOGNITION_TOGGLE_LOADING:
      const { loading } = action.payload;
      return {
        ...state,
        loading
      };
    case FACE_RECOGNITION_TOGGLE_PHOTO_SRC:
      const { photo } = action.payload;
      return {
        ...state,
        photoSrc: photo,
      }
    case FACE_RECOGNITION_LOAD_FACES:
      const { faces } = action.payload;
      return {
        ...state,
        showLoginView: true,
        allUserFaces: [...faces],
      }
    case LOGIN_TOGGLE_LOADING:
      const { loading: logging } = action.payload;
      return {
        ...state,
        logging
      }
    case FACE_RECOGNITION_HIDE_LOGIN_VIEW:
      return {
        ...state,
        allUserFaces: [],
        showLoginView: false,
      }
    case FACE_RECOGNITION_TOGGLE_FAIL:
      const { failed } = action.payload;
      return {
        ...state,
        failed,
      }
    case FACE_RECOGNITION_SAVE_CAPTURE:
      const { faceCapture } = action.payload;
      return {
        ...state,
        faceCaptures: [
          ...state.faceCaptures,
          faceCapture,
        ]
      }
    case FACE_RECOGNITION_CLEAR_CAPTURES:
      return {
        ...state,
        faceCaptures: [],
      }
    case FACE_RECOGNITION_RESET:
      return { ...initialState };
    default:
      return state;
  }
}
