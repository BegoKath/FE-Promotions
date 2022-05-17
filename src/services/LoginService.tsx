import { Globals } from '../global/Globals';
import { Api } from './Api';
import { IApiResponse } from '../interfaces/IApiResponse';

export class LoginService {
  static logIn = async (props: { mail: string, password: string }): Promise<IApiResponse> => {
    const url = `${Globals.getApiUrl}/${Globals.getApiPath1}/security/login`;
    const { mail, password } = props;
    const body = {
      mail,
      password,
      crdFav: '',
      idBsnUnGp: Globals.getIdBsnUnGp,
    }
    return await Api.post(url, body);
  }

  static logInWithId = async (idClient: number): Promise<IApiResponse> => {
    const url = `${Globals.getApiUrl}/${Globals.getApiPath1}/security/loginId`;
    const body = {
      idClient,
      password: '29aaf982f8ef1136cd91f18235831ed8',
      crdFav: '',
      idBsnUnGp: Globals.getIdBsnUnGp,
    }
    return await Api.post(url, body);
  }
}