import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { BookCreateInterface, BookDeleteInterface, BookFiltersToString, BookInterface, BookListInterface, BookUpdateInterface } from './book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  private readonly API = `${constants.APP_URL}/book`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number, filterParams: BookFiltersToString): Observable<BookListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage).appendAll(filterParams.data);
    console.log(params.toString());


    return this.http.get<BookListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }

  delete(id: number): Observable<BookDeleteInterface> {
    return this.http.delete<BookDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  create(type: BookCreateInterface): Observable<BookInterface> {
    return this.http.post<BookInterface>(this.API, type, { headers: this.headers });
  }

  get(id: number): Observable<BookInterface> {
    return this.http.get<BookInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id:number, type: BookUpdateInterface): Observable<BookInterface> {
    return this.http.patch<BookInterface>(`${this.API}/${id}`,type, { headers: this.headers });
  }
}
