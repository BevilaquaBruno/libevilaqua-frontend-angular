export interface Tag {
  id: number;
  description: string;
}

export interface CreateTagRequest {
  description: string;
}

export interface UpdateTagRequest {
  id: number;
  description: string;
}

export interface TagListResponse {
  data: Tag[];
  count: number;
}