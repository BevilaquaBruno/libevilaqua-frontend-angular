import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environments';
import { UserCreateInterface, UserDeleteInterface, UserInterface, UserListInterface, UserUpdateInterface, UserUpdateResponseInterface } from './user.interface'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API = `${constants.APP_URL}/user`;
  private headers: HttpHeaders = new HttpHeaders(
    `Authorization: Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) { }

  list(page: number, itensPerPage: number): Observable<UserListInterface> {
    let params = new HttpParams().set('page', page).set('limit', itensPerPage);

    return this.http.get<UserListInterface>(this.API, {
      params,
      headers: this.headers,
    });
  }

  getUser(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  deleteUser(id: number): Observable<UserDeleteInterface> {
    return this.http.delete<UserDeleteInterface>(`${this.API}/${id}`, { headers: this.headers });
  }

  createUser(user: UserCreateInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.API, user, { headers: this.headers });
  }

  updateUser(id:number, user: UserUpdateInterface): Observable<UserUpdateResponseInterface> {
    return this.http.patch<UserUpdateResponseInterface>(`${this.API}/${id}`,user, { headers: this.headers });
  }
}
