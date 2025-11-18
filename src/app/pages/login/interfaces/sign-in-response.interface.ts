import { LibraryList } from "./library-list.interface";

export interface SignInResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  libraries: LibraryList[];
}
