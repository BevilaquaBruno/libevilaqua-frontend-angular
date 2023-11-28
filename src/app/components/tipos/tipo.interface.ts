export interface TipoInterface {
  id: number;
  description: string;
}

export interface TipoListInterface {
  data: TipoInterface[];
  count: number;
}


export interface TipoDeleteInterface {
  affected: number,
  raw: any[]
}

export interface TipoCreateInterface {
  description: string;
}

export interface TipoUpdateInterface {
  id: number;
  description: string;
}

export interface TipoUpdateResponseInterface {
  raw: any[]
  affected: number;
}
