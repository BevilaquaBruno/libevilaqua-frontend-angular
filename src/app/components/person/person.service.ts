import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from 'src/environments/environments';
import { PersonCreateInterface, PersonDeleteInterface, PersonInterface, PersonListInterface, PersonUpdateInterface, PersonUpdateResponseInterface } from './person.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly API = `${constants.APP_URL}/person`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number): Observable<PersonListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage);

    return this.http.get<PersonListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }

  delete(id: number): Observable<PersonDeleteInterface> {
    return this.http.delete<PersonDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  create(type: PersonCreateInterface): Observable<PersonInterface> {
    return this.http.post<PersonInterface>(this.API, type, { headers: this.headers });
  }

  get(id: number): Observable<PersonInterface> {
    return this.http.get<PersonInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id:number, type: PersonUpdateInterface): Observable<PersonUpdateResponseInterface> {
    return this.http.patch<PersonUpdateResponseInterface>(`${this.API}/${id}`,type, { headers: this.headers });
  }
}
