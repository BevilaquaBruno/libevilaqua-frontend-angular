export interface GenreInterface {
  id: number;
  description: string;
}

export interface GenreListInterface {
  data: GenreInterface[];
  count: number;
}


export interface GenreDeleteInterface {
  affected: number,
  raw: any[]
}

export interface GenreCreateInterface {
  description: string;
}

export interface GenreUpdateInterface {
  id: number;
  description: string;
}

export interface GenreUpdateResponseInterface {
  raw: any[]
  affected: number;
}
