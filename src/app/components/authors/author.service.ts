import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { AuthorCreateInterface, AuthorDeleteInterface, AuthorInterface, AuthorListInterface, AuthorUpdateInterface, AuthorUpdateResponseInterface } from 'src/app/components/authors/author.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private readonly API = `${constants.APP_URL}/author`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number): Observable<AuthorListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage);

    return this.http.get<AuthorListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }

  delete(id: number): Observable<AuthorDeleteInterface> {
    return this.http.delete<AuthorDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  create(type: AuthorCreateInterface): Observable<AuthorInterface> {
    return this.http.post<AuthorInterface>(this.API, type, { headers: this.headers });
  }

  get(id: number): Observable<AuthorInterface> {
    return this.http.get<AuthorInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id:number, type: AuthorUpdateInterface): Observable<AuthorUpdateResponseInterface> {
    return this.http.patch<AuthorUpdateResponseInterface>(`${this.API}/${id}`,type, { headers: this.headers });
  }
}
