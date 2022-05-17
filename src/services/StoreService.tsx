import { Globals } from "../global/Globals"
import { Api } from './Api';
import { IApiResponse } from '../interfaces/IApiResponse';

export class StoreService {
  static loadAdvertising = async (): Promise<IApiResponse> => {
    const url = `${Globals.getApiUrl}/${Globals.getApiPath2}/store/advertising`;
    const body = {
      id_store: Globals.getIdStore,
      id_bsnungp: Globals.getIdBsnUnGp,
    }
    return await Api.post(url, body);
  }
}