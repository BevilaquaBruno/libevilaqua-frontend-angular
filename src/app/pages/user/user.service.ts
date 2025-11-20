import { Injectable } from '@angular/core';
import env from '../../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUserWithLibraryResponse } from './interfaces/new-user-with-library.interface';
import { Languages } from '../../enums/languages.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API = `${env.API_URL}/user`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  newWithLibrary(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    language: Languages,
    libraryDescription: string,
  ): Observable<NewUserWithLibraryResponse> {
    return this.http.post<NewUserWithLibraryResponse>(`${this.API}/with-library`, {
      user: {
        name: name,
        email: email,
        password: password,
        verify_password: password_confirmation,
        language: language,
      },
      library: {
        description: libraryDescription,
      },
    });
  }
}
