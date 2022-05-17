import { LanguageType } from "../types/LanguageType";
import { Keys } from "../constants/Keys";

const apiUrl: string = "http://10.122.5.153:8080";
const apiPath1: string = "nuo-client-ec";
const apiPath2: string = "nuo-order-ec";
const idBsnUnGp: number = 5;
const language: LanguageType = "es";
const idStore: number = 112;
export class Globals {
  static set setApiPath1(value: string) {
    localStorage.setItem(Keys.API_PATH_1, value);
  }

  static get getApiPath1() {
    return localStorage.getItem(Keys.API_PATH_1) ?? apiPath1;
  }

  static set setApiPath2(value: string) {
    localStorage.setItem(Keys.API_PATH_2, value);
  }

  static get getApiPath2() {
    return localStorage.getItem(Keys.API_PATH_2) ?? apiPath2;
  }

  static set setApiUrl(value: string) {
    localStorage.setItem(Keys.API_URL, value);
  }

  static get getApiUrl() {
    return localStorage.getItem(Keys.API_URL) ?? apiUrl;
  }

  static set setAuthToken(value: string) {
    localStorage.setItem(Keys.AUTH_TOKEN, `Bearer ${value}`);
  }

  static get getAuthToken() {
    return localStorage.getItem(Keys.AUTH_TOKEN);
  }

  static set setIdBsnUnGp(value: string) {
    localStorage.setItem(Keys.ID_BSN_UN_GP, value);
  }

  static get getIdBsnUnGp() {
    return localStorage.getItem(Keys.ID_BSN_UN_GP) !== null
      ? Number(localStorage.getItem(Keys.ID_BSN_UN_GP))
      : idBsnUnGp;
  }

  static set setLanguage(value: string) {
    localStorage.setItem(Keys.LANGUAGE, value);
  }

  static get getLanguage() {
    return localStorage.getItem(Keys.LANGUAGE) ?? language;
  }

  static set setUserName(value: string) {
    localStorage.setItem(Keys.USER_NAME, value);
  }

  static get getUserName() {
    return localStorage.getItem(Keys.USER_NAME);
  }

  static set setIdUser(value: string) {
    localStorage.setItem(Keys.USER_ID, value);
  }

  static get getIdUser() {
    return localStorage.getItem(Keys.USER_ID) !== null
      ? Number(localStorage.getItem(Keys.USER_ID))
      : undefined;
  }

  static set setIdStore(value: string) {
    localStorage.setItem(Keys.ID_STORE, value);
  }

  static get getIdStore() {
    return localStorage.getItem(Keys.ID_STORE) !== null
      ? Number(localStorage.getItem(Keys.ID_STORE))
      : idStore;
  }
}
