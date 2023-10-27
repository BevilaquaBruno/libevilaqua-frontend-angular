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

export interface UsuarioUpdateInterface {
  id: number;
  name: string;
  email: string;
}

export interface UsuarioUpdateResponseInterface {
  raw: any[]
  affected: number;
}

export interface UsuarioCreateInterface {
  name: string;
  email: string;
  password: string;
  verify_password: string;
}
