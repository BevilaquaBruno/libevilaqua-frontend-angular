export interface Author {
  id: number;
  name: string;
  birth_date: string | null;
  death_date: string | null;
  bio: string | null;
}

export interface CreateAuthorRequest {
  name: string;
  birth_date?: string;
  death_date?: string;
  bio?: string;
}

export interface UpdateAuthorRequest extends CreateAuthorRequest {
  id: number;
}

export interface AuthorListResponse {
  data: Author[];
  count: number;
}
