export interface IUserFaceInfo {
  clfCodigo?: number;
  clfFace1?: string;
  clfFace2?: string;
  clfFace3?: string;
  clfFechaModificacion?: Date;
  idCliente?: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toIUserFaceInfo(json: string): IUserFaceInfo {
    return JSON.parse(json);
  }

  public static iUserFaceInfoToJson(value: IUserFaceInfo): string {
    return JSON.stringify(value);
  }
}
