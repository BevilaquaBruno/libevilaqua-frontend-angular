import { Languages } from "../../../enums/languages.enum";

export interface NewUserWithLibraryResponse {
  id: number;
  name: string;
  email: string;
  language: Languages;
  library: {
    id: number,
    description: string;
  }
}
