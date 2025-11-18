export interface SignInResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  libraries: LibraryList[];
}
