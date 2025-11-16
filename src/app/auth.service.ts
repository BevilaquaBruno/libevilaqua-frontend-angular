import { Injectable } from '@angular/core';
import env from '../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  signIn(email: string, password: string) {
    return this.http.post(`${this.API}/signin`,{
      email: email,
      password: password
    });
  }
}
