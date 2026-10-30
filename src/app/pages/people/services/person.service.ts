import { Injectable } from '@angular/core';
import env from '../../../../env';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Person,
  CreatePersonRequest,
  UpdatePersonRequest,
  PersonListResponse
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly API = `${env.API_URL}/person`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  create(person: CreatePersonRequest): Observable<Person> {
    return this.http.post<Person>(this.API, person, { headers: this.headers });
  }

  findAll(page: number = 1, limit: number = 10): Observable<PersonListResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PersonListResponse>(this.API, {
      headers: this.headers,
      params
    });
  }

  findOne(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id: number, person: UpdatePersonRequest): Observable<Person> {
    return this.http.patch<Person>(`${this.API}/${id}`, person, { headers: this.headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, { headers: this.headers });
  }
}
