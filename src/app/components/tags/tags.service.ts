import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { TagCreateInterface, TagDeleteInterface, TagInterface, TagListInterface, TagUpdateInterface, TagUpdateResponseInterface } from './tag.interface';

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

  delete(id: number): Observable<TagDeleteInterface> {
    return this.http.delete<TagDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  create(type: TagCreateInterface): Observable<TagInterface> {
    return this.http.post<TagInterface>(this.API, type, { headers: this.headers });
  }

  get(id: number): Observable<TagInterface> {
    return this.http.get<TagInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id:number, type: TagUpdateInterface): Observable<TagUpdateResponseInterface> {
    return this.http.patch<TagUpdateResponseInterface>(`${this.API}/${id}`,type, { headers: this.headers });
  }
}
