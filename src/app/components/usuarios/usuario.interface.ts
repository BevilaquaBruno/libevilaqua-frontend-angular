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

export interface UsuarioCreateInterface {
  name: string;
  email: string;
  password: string;
  verify_password: string;
}
