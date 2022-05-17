export interface IUser {
  canal?: Canal;
  casado?: number;
  direccion?: string;
  estado?: number;
  fechaNacimiento?: Date;
  hijos?: number;
  idCliente?: number;
  identificacion?: string;
  idFb?: null;
  idSagTipoCliente?: null;
  imagenPerfil?: null;
  mail?: string;
  nombre?: string;
  provider?: null;
  telefono?: string;
  tipoIdentificacion?: string;
}

export interface Canal {
  estado?: number;
  fechaCreacion?: Date;
  idCanal?: number;
  nombre?: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toIUser(json: string): IUser {
    return JSON.parse(json);
  }

  public static iUserToJson(value: IUser): string {
    return JSON.stringify(value);
  }
}
