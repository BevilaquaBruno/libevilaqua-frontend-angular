import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { UsuarioCreateInterface, UsuarioDeleteInterface, UsuarioInterface, UsuarioListInterface, UsuarioUpdateInterface, UsuarioUpdateResponseInterface } from './usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API = `${constants.APP_URL}/user`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number): Observable<UsuarioListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage);

    return this.http.get<UsuarioListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }

  getUser(id: number): Observable<UsuarioInterface> {
    return this.http.get<UsuarioInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  deleteUser(id: number): Observable<UsuarioDeleteInterface> {
    return this.http.delete<UsuarioDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  createUser(user: UsuarioCreateInterface): Observable<UsuarioInterface> {
    return this.http.post<UsuarioInterface>(this.API, user, { headers: this.headers });
  }

  updateUser(id:number, user: UsuarioUpdateInterface): Observable<UsuarioUpdateResponseInterface> {
    console.log(this.headers);
    console.log(id);
    console.log(user);

    return this.http.patch<UsuarioUpdateResponseInterface>(`${this.API}/${id}`,user, { headers: this.headers });
  }
}
