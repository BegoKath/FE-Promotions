import axios from "axios";
import { IApiResponse } from '../interfaces/IApiResponse';
import { Globals } from '../global/Globals';

export class Api {
  private static service = axios.create({
    timeout: 10 * 1000,
  });

  static post = async (url: string, body?: any): Promise<IApiResponse> => {
    try {
      const res = await this.service.post(
        url,
        body, {
        method: 'post',
        headers: {
          'Accept-Language': Globals.getLanguage,
          'Authorization': Globals.getAuthToken ?? '',
        }
      });

      if (!res.data) {
        return this.createErrorObject(res);
      }

      const data = res.data as IApiResponse;
      return {
        ...data,
        message: data.correctProcess ? data.message : this.getError(data),
      }

    } catch (error) {
      return this.createErrorObject(error);
    }
  }

  static createErrorObject = (error: any): IApiResponse => {
    return {
      correctProcess: false,
      message: this.getError(error),
      data: undefined,
    };
  }

  static getError = (error: any): string => {
    if (error.response && error.response.data) {
      return error.response.data.message;
    }
    if (error.code === 'ERR_NETWORK') {
      return 'No se ha podido establecer conexión con el servidor';
    }
    if (error.code === 'ECONNABORTED') {
      return 'Tiempo agotado, por favor vuelva a intentarlo';
    }
    if (error.message) {
      return error.message;
    }
    return error ? `${error}` : 'Error al tratarse de conectar al servidor, por favor vuelva a intentarlo';
  }
}
