import { Injectable } from '@angular/core';
import env from '../../../../env';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag, CreateTagRequest, UpdateTagRequest, TagListResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly API = `${env.API_URL}/tag`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  create(tag: CreateTagRequest): Observable<Tag> {
    return this.http.post<Tag>(this.API, tag, { headers: this.headers });
  }

  findAll(page: number = 1, limit: number = 10): Observable<TagListResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<TagListResponse>(this.API, {
      headers: this.headers,
      params
    });
  }

  findOne(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id: number, tag: UpdateTagRequest): Observable<Tag> {
    return this.http.patch<Tag>(`${this.API}/${id}`, tag, { headers: this.headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, { headers: this.headers });
  }
}