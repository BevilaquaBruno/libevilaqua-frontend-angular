export interface TypeInterface {
  id: number;
  description: string;
}

export interface TypeListInterface {
  data: TypeInterface[];
  count: number;
}


export interface TypeDeleteInterface {
  affected: number,
  raw: any[]
}

export interface TypeCreateInterface {
  description: string;
}

export interface TypeUpdateInterface {
  id: number;
  description: string;
}

export interface TypeUpdateResponseInterface {
  raw: any[]
  affected: number;
}
