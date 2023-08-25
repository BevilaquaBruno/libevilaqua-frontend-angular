import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from 'src/environments/environments';
import { LoginInterface, LoginResponseSuccessfull, ValidateToken } from './login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API = `${constants.APP_URL}/auth`;

  constructor(private http: HttpClient) { }

  signin(loginData: LoginInterface): Observable<LoginResponseSuccessfull> {
    return this.http.post<LoginResponseSuccessfull>(`${this.API}/signin`, loginData);
  }

  validate(token: string): Observable<ValidateToken> {
    let headers: HttpHeaders = new HttpHeaders(
      `Authorization: Bearer ${token}`
    );
    return this.http.get<ValidateToken>(`${this.API}/isValid`, { headers });
  }
}
