import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { GenreCreateInterface, GenreDeleteInterface, GenreInterface, GenreListInterface, GenreUpdateInterface, GenreUpdateResponseInterface } from './genre.interface';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private readonly API = `${constants.APP_URL}/genre`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number): Observable<GenreListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage);

    return this.http.get<GenreListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }

  delete(id: number): Observable<GenreDeleteInterface> {
    return this.http.delete<GenreDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  create(type: GenreCreateInterface): Observable<GenreInterface> {
    return this.http.post<GenreInterface>(this.API, type, { headers: this.headers });
  }

  get(id: number): Observable<GenreInterface> {
    return this.http.get<GenreInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id:number, type: GenreUpdateInterface): Observable<GenreUpdateResponseInterface> {
    return this.http.patch<GenreUpdateResponseInterface>(`${this.API}/${id}`,type, { headers: this.headers });
  }
}
