import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { TipoDeleteInterface, TipoListInterface } from './tipo.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private readonly API = `${constants.APP_URL}/type`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number): Observable<TipoListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage);

    return this.http.get<TipoListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }

  delete(id: number): Observable<TipoDeleteInterface> {
    return this.http.delete<TipoDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }
}
