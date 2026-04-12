import { Injectable } from '@angular/core';
import env from '../../../../env';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publisher, CreatePublisherRequest, UpdatePublisherRequest, PublisherListResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private readonly API = `${env.API_URL}/publisher`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  create(publisher: CreatePublisherRequest): Observable<Publisher> {
    return this.http.post<Publisher>(this.API, publisher, { headers: this.headers });
  }

  findAll(page: number = 1, limit: number = 10): Observable<PublisherListResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PublisherListResponse>(this.API, {
      headers: this.headers,
      params
    });
  }

  findOne(id: number): Observable<Publisher> {
    return this.http.get<Publisher>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id: number, publisher: UpdatePublisherRequest): Observable<Publisher> {
    return this.http.patch<Publisher>(`${this.API}/${id}`, publisher, { headers: this.headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, { headers: this.headers });
  }
}