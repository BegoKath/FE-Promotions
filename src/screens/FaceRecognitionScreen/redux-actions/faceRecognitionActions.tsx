import { IReduxAction } from '../../../interfaces/IReduxAction';
import { IFaceData } from '../../../interfaces/IFaceData';

export const FACE_RECOGNITION_TOGGLE_PHOTO_SRC = '@faceRecognition/toggle_photo_src';
export const FACE_RECOGNITION_SAVE_CAPTURE = '@faceRecognition/save_capture';
export const FACE_RECOGNITION_HIDE_LOGIN_VIEW = '@faceRecognition/hide_login_view';
export const FACE_RECOGNITION_LOAD_FACES = '@faceRecognition/load_faces';
export const FACE_RECOGNITION_TOGGLE_FAIL = '@faceRecognition/toggle_fail';
export const FACE_RECOGNITION_TOGGLE_LOADING = '@faceRecognition/toggle_loading';
export const FACE_RECOGNITION_RESET = '@faceRecognition/reset';
export const FACE_RECOGNITION_CLEAR_CAPTURES = '@faceRecognition/clear_captures';

export const faceRecognitionToggleLoading = (loading: boolean) => {
  return {
    type: FACE_RECOGNITION_TOGGLE_LOADING,
    payload: {
      loading,
    }
  }
}

export const faceRecognitionTogglePhotoSrc = (photoSrc?: any): IReduxAction => ({
  type: FACE_RECOGNITION_TOGGLE_PHOTO_SRC,
  payload: {
    photo: photoSrc,
  }
})

export const faceRecognitionSaveCapture = (faceCapture: string): IReduxAction => ({
  type: FACE_RECOGNITION_SAVE_CAPTURE,
  payload: {
    faceCapture,
  }
})

export const faceRecognitionHideLoginView = (): IReduxAction => ({
  type: FACE_RECOGNITION_HIDE_LOGIN_VIEW,
})

export const faceRecognitionLoadFaces = (faces: IFaceData[]): IReduxAction => ({
  type: FACE_RECOGNITION_LOAD_FACES,
  payload: {
    faces,
  }
})

export const faceRecognitionToggleFail = (failed: boolean): IReduxAction => ({
  type: FACE_RECOGNITION_TOGGLE_FAIL,
  payload: {
    failed,
  }
})

export const faceRecognitionReset = (): IReduxAction => ({
  type: FACE_RECOGNITION_RESET,
})

export const faceRecognitionClearCaptures = (): IReduxAction => ({
  type: FACE_RECOGNITION_CLEAR_CAPTURES,
})