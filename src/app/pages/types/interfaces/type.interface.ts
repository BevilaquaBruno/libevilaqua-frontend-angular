export interface Type {
  id: number;
  description: string;
}

export interface CreateTypeRequest {
  description: string;
}

export interface UpdateTypeRequest {
  id: number;
  description: string;
}

export interface TypeListResponse {
  data: Type[];
  count: number;
}