export interface Person {
  id: number;
  name: string;
  document: string;
  zip_code: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  obs: string;
  email: string;
  phone: string;
  country: string;
}

export interface CreatePersonRequest {
  name: string;
  document?: string;
  zip_code?: string;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
  obs?: string;
  email?: string;
  phone?: string;
  country?: string;
}

export interface UpdatePersonRequest extends CreatePersonRequest {
  id: number;
}

export interface PersonListResponse {
  data: Person[];
  count: number;
}
