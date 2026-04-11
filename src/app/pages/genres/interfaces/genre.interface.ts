export interface Genre {
  id: number;
  description: string;
}

export interface CreateGenreRequest {
  description: string;
}

export interface UpdateGenreRequest {
  id: number;
  description: string;
}

export interface GenreListResponse {
  data: Genre[];
  count: number;
}