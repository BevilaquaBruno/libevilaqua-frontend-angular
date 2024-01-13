import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from 'src/environments/environments';
import { PublisherCreateInterface, PublisherDeleteInterface, PublisherInterface, PublisherListInterface, PublisherUpdateInterface, PublisherUpdateResponseInterface } from './publisher.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private readonly API = `${constants.APP_URL}/publisher`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number): Observable<PublisherListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage);

    return this.http.get<PublisherListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }

  delete(id: number): Observable<PublisherDeleteInterface> {
    return this.http.delete<PublisherDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  create(type: PublisherCreateInterface): Observable<PublisherInterface> {
    return this.http.post<PublisherInterface>(this.API, type, { headers: this.headers });
  }

  get(id: number): Observable<PublisherInterface> {
    return this.http.get<PublisherInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id:number, type: PublisherUpdateInterface): Observable<PublisherUpdateResponseInterface> {
    return this.http.patch<PublisherUpdateResponseInterface>(`${this.API}/${id}`,type, { headers: this.headers });
  }
}
