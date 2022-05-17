import { IApiResponse } from "../interfaces/IApiResponse";
import { Api } from "./Api";

export class promotionsService {
  static getPromotions = async (): Promise<IApiResponse> => {
    const url = "http://10.122.5.153:8080/nuo-order-ec/store/advertising";
    const body = {
      id_store: 112,

      id_bsnungp: 5,
    };
    return await Api.post(url, body);
  };
}
