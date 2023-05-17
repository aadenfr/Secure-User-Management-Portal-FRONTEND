import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from  '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host = environment.apiUrl
  private token: null | undefined;
  private loggedInUsername: null | undefined;

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
    // we set the observe be 'response' to aslo return the headers, not just the body
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/user/login`, user, {observe: 'response'})

  }

  public register(user: User): Observable<User | HttpErrorResponse> {
    // here we only need the response body from the observable
    return this.http.post<User | HttpErrorResponse> (`${this.host}/user/register`, user);
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');

  }


}
