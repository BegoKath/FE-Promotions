import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { faceRecognitionReducer } from '../screens/FaceRecognitionScreen/redux-reducers/faceRecognitionReducer';
import { loginReducer } from "../screens/LoginScreen/redux-reducers/loginReducer";
import { storeReducer } from './reducers/storeReducer';

const rootReducers = combineReducers({
  faceRecognition: faceRecognitionReducer,
  login: loginReducer,
  store: storeReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});