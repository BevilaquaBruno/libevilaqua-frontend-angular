import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from 'src/environments/environments';
import { LoanCreateInterface, LoanDeleteInterface, LoanFiltersToString, LoanInterface, LoanListInterface, LoanUpdateInterface } from './loan.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private readonly API = `${constants.APP_URL}/loan`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number, filterParams: LoanFiltersToString): Observable<LoanListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage).appendAll(filterParams.data);
    console.log(params.toString());


    return this.http.get<LoanListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }

  delete(id: number): Observable<LoanDeleteInterface> {
    return this.http.delete<LoanDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  create(type: LoanCreateInterface): Observable<LoanInterface> {
    return this.http.post<LoanInterface>(this.API, type, { headers: this.headers });
  }

  get(id: number): Observable<LoanInterface> {
    return this.http.get<LoanInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  update(id: number, type: LoanUpdateInterface): Observable<LoanInterface> {
    return this.http.patch<LoanInterface>(`${this.API}/${id}`, type, { headers: this.headers });
  }
}
