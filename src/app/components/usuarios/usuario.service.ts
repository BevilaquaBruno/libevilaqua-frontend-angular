import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { UsuarioInterface, UsuarioListInterface } from './usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API = `${constants.APP_URL}/user`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) {}

  list(page: number, itensPerPage: number): Observable<UsuarioListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage);

    return this.http.get<UsuarioListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }
}
