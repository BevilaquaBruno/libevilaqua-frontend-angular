import { Injectable } from '@angular/core';
import env from '../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInResponse } from './pages/login/interfaces/sign-in-response.interface';
import { SelectLibraryResponse } from './pages/login/interfaces/select-library-response.interface';
import { BaseResponse } from './interfaces/base-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = `${env.API_URL}/auth`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  isTokenValid() {
    return this.http.get(`${this.API}/isValid`, { headers: this.headers });
  }

  signIn(email: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.API}/signin`, {
      email: email,
      password: password
    });
  }

  selectLibrary(email: string, password: string, libraryId: number): Observable<SelectLibraryResponse> {
    return this.http.post<SelectLibraryResponse>(`${this.API}/select-library`, {
      email: email,
      password: password,
      libraryId: libraryId
    });
  }

  sendResetPassword(email: string): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.API}/send-reset-password`, {
      email: email
    });
  }
}
