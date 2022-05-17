export interface ILoginResponse {
  authToken?: string;
  estado?: number;
  idCliente?: number;
  idSagTipoCliente?: null;
  imagenPerfil?: null;
  mail?: string;
  nombre?: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toILoginResponse(json: string): ILoginResponse {
    return JSON.parse(json);
  }

  public static iLoginResponseToJson(value: ILoginResponse): string {
    return JSON.stringify(value);
  }
}
