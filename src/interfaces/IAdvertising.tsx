export interface IAdvertising {
  image?: string;
  price?: number;
  product?: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toIAdvertising(json: string): IAdvertising {
    return JSON.parse(json);
  }

  public static iAdvertisingToJson(value: IAdvertising): string {
    return JSON.stringify(value);
  }
}
