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
