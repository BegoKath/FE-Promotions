import { Globals } from "../global/Globals";
import { Api } from "./Api";
import { IApiResponse } from '../interfaces/IApiResponse';

export class FacesService {
  static loadFaces = async (): Promise<IApiResponse> => {
    const url = `${Globals.getApiUrl}/${Globals.getApiPath1}/client/faces`;
    return await Api.post(url);
  }

  static registerFaces = async (face1: string, face2: string, face3: string): Promise<IApiResponse> => {
    const url = `${Globals.getApiUrl}/${Globals.getApiPath1}/client/face/register`;
    const body = {
      id: Globals.getIdUser,
      face_1: face1,
      face_2: face2,
      face_3: face3,
    }
    return await Api.post(url, body);
  }
}