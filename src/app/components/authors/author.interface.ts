export interface AuthorInterface {
  id: number;
  name: string;
  birth_date: string | null;
  death_date: string | null;
  bio: string | null;
}

export interface AuthorListInterface {
  data: AuthorInterface[];
  count: number;
}


export interface AuthorDeleteInterface {
  affected: number,
  raw: any[]
}

export interface AuthorCreateInterface {
  name: string;
  birth_date: string | null;
  death_date: string | null;
  bio: string | null;
}

export interface AuthorUpdateInterface {
  id: number;
  name: string;
  birth_date: string | null;
  death_date: string | null;
  bio: string | null;
}

export interface AuthorUpdateResponseInterface {
  raw: any[]
  affected: number;
}
