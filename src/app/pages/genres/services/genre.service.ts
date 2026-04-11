import { Injectable } from '@angular/core';
import env from '../../../../env';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre, CreateGenreRequest, UpdateGenreRequest, GenreListResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private readonly API = `${env.API_URL}/genre`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  create(genre: CreateGenreRequest): Observable<Genre> {
    return this.http.post<Genre>(this.API, genre, { headers: this.headers });
  }

  findAll(page: number = 1, limit: number = 10): Observable<GenreListResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<GenreListResponse>(this.API, {
      headers: this.headers,
      params
    });
  }

  findOne(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id: number, genre: UpdateGenreRequest): Observable<Genre> {
    return this.http.patch<Genre>(`${this.API}/${id}`, genre, { headers: this.headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, { headers: this.headers });
  }
}