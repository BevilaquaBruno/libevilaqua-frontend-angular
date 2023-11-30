import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { TagListInterface } from './tag.interface';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private readonly API = `${constants.APP_URL}/tag`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number): Observable<TagListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage);

    return this.http.get<TagListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }
}
