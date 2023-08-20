export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginResponseSuccessfull {
  access_token: string;
}

export interface LoginResponseFailed {
  statusCode: number;
  message: string;
}

