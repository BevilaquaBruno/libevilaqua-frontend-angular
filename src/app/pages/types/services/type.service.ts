import { Injectable } from '@angular/core';
import env from '../../../../env';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type, CreateTypeRequest, UpdateTypeRequest, TypeListResponse } from '../interfaces/type.interface';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private readonly API = `${env.API_URL}/type`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  create(type: CreateTypeRequest): Observable<Type> {
    return this.http.post<Type>(this.API, type, { headers: this.headers });
  }

  findAll(page: number = 1, limit: number = 10): Observable<TypeListResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<TypeListResponse>(this.API, {
      headers: this.headers,
      params
    });
  }

  findOne(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id: number, type: UpdateTypeRequest): Observable<Type> {
    return this.http.patch<Type>(`${this.API}/${id}`, type, { headers: this.headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, { headers: this.headers });
  }
}