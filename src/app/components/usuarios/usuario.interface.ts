export interface UsuarioInterface {
  id: number;
  name: string;
  email:string;
}

export interface UsuarioListInterface {
  data: UsuarioInterface[];
  count: number;
}

export interface UsuarioDeleteInterface {
  affected: number,
  raw: any[]
}
