import { Injectable } from '@angular/core';
import env from '../../../../env';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Author,
  CreateAuthorRequest,
  UpdateAuthorRequest,
  AuthorListResponse
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private readonly API = `${env.API_URL}/author`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  create(author: CreateAuthorRequest): Observable<Author> {
    return this.http.post<Author>(this.API, author, { headers: this.headers });
  }

  findAll(page: number = 1, limit: number = 10): Observable<AuthorListResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<AuthorListResponse>(this.API, {
      headers: this.headers,
      params
    });
  }

  findOne(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id: number, author: UpdateAuthorRequest): Observable<Author> {
    return this.http.patch<Author>(`${this.API}/${id}`, author, { headers: this.headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, { headers: this.headers });
  }
}
