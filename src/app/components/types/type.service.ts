import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { TypeCreateInterface, TypeDeleteInterface, TypeInterface, TypeListInterface, TypeUpdateInterface, TypeUpdateResponseInterface } from './type.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private readonly API = `${constants.APP_URL}/type`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number): Observable<TypeListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage);

    return this.http.get<TypeListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }

  delete(id: number): Observable<TypeDeleteInterface> {
    return this.http.delete<TypeDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  create(type: TypeCreateInterface): Observable<TypeInterface> {
    return this.http.post<TypeInterface>(this.API, type, { headers: this.headers });
  }

  get(id: number): Observable<TypeInterface> {
    return this.http.get<TypeInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id:number, type: TypeUpdateInterface): Observable<TypeUpdateResponseInterface> {
    return this.http.patch<TypeUpdateResponseInterface>(`${this.API}/${id}`,type, { headers: this.headers });
  }
}
