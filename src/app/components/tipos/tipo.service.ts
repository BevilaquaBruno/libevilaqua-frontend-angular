import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { TipoCreateInterface, TipoDeleteInterface, TipoInterface, TipoListInterface, TipoUpdateInterface, TipoUpdateResponseInterface } from './tipo.interface';

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

  create(type: TipoCreateInterface): Observable<TipoInterface> {
    return this.http.post<TipoInterface>(this.API, type, { headers: this.headers });
  }

  get(id: number): Observable<TipoInterface> {
    return this.http.get<TipoInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id:number, type: TipoUpdateInterface): Observable<TipoUpdateResponseInterface> {
    return this.http.patch<TipoUpdateResponseInterface>(`${this.API}/${id}`,type, { headers: this.headers });
  }
}
