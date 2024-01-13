export interface UserInterface {
  id: number;
  name: string;
  email:string;
}

export interface UserListInterface {
  data: UserInterface[];
  count: number;
}

export interface UserDeleteInterface {
  affected: number,
  raw: any[]
}

export interface UserUpdateInterface {
  id: number;
  name: string;
  email: string;
}

export interface UserUpdateResponseInterface {
  raw: any[]
  affected: number;
}

export interface UserCreateInterface {
  name: string;
  email: string;
  password: string;
  verify_password: string;
}
