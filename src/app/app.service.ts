import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly API = `${constants.APP_URL}`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) {}

  isValid(): Observable<any>{
    return this.http.get(`${this.API}/auth/isValid`, { headers: this.headers });
  }
}
