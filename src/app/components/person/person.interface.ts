import { StateList } from "src/environments/environments";


export interface PersonInterface{
  id: number;
  name: string;
  cpf: string | null;
  cep: string | null;
  state: StateList | null;
  city: string | null;
  district: string | null;
  street: string | null;
  number: string | null;
  obs: string | null;
}

export interface PersonListInterface {
  data: PersonInterface[];
  count: number;
}


export interface PersonDeleteInterface {
  affected: number,
  raw: any[]
}

export interface PersonCreateInterface {
  name: string;
  cpf: string | null;
  cep: string | null;
  state: StateList | null;
  city: string | null;
  district: string | null;
  street: string | null;
  number: string | null;
  obs: string | null;
}

export interface PersonUpdateInterface {
  id: number;
  name: string;
  cpf: string | null;
  cep: string | null;
  state: StateList | null;
  city: string | null;
  district: string | null;
  street: string | null;
  number: string | null;
  obs: string | null;
}

export interface PersonUpdateResponseInterface {
  raw: any[]
  affected: number;
}
