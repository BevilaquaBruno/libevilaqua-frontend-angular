export interface PublisherInterface {
  id: number;
  name: string;
  country: string;
}

export interface PublisherListInterface {
  data: PublisherInterface[];
  count: number;
}


export interface PublisherDeleteInterface {
  affected: number,
  raw: any[]
}

export interface PublisherCreateInterface {
  name: string;
  country: string;
}

export interface PublisherUpdateInterface {
  id: number;
  name: string;
  country: string;
}

export interface PublisherUpdateResponseInterface {
  raw: any[]
  affected: number;
}
