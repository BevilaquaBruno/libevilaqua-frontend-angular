export interface TagInterface {
  id: number;
  description: string;
}

export interface TagListInterface {
  data: TagInterface[];
  count: number;
}


export interface TagDeleteInterface {
  affected: number,
  raw: any[]
}

export interface TagCreateInterface {
  description: string;
}

export interface TagUpdateInterface {
  id: number;
  description: string;
}

export interface TagUpdateResponseInterface {
  raw: any[]
  affected: number;
}
