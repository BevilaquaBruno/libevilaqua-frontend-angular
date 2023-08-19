import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { constants } from 'src/environments/environments';
import { LoginInterface, LoginResponse } from './login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API = `${constants.APP_URL}/auth`;

  constructor(private http: HttpClient) {}

  signin(loginData: LoginInterface): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/signin`, loginData);
  }
}
