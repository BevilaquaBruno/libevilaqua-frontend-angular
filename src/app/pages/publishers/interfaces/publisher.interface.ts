export interface Publisher {
  id: number;
  name: string;
  country: string;
}

export interface CreatePublisherRequest {
  name: string;
  country: string;
}

export interface UpdatePublisherRequest {
  id: number;
  name: string;
  country: string;
}

export interface PublisherListResponse {
  data: Publisher[];
  count: number;
}