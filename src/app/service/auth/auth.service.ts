import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../interface/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = environment.baseUrl + '/api/auth';
  private authToken: string = 'jwtToken';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  signup(user: User): Observable<any> {
    return this.http.post(`${this.authUrl}/signup`, user);
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, user);
  }

  updateUser(oldPassword: string, newPassword: string): Observable<any> {
    const payload = { oldPassword, newPassword };
    return this.http.post(this.authUrl + '/update-password', payload);
  }

  getAuthUser(): Observable<User> {
    return this.http.get<User>(this.authUrl + '/auth-user');
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authToken);
  }

  setAuthToken(token: string) {
    localStorage.setItem(this.authToken, token);
  }

  logout() {
    localStorage.removeItem(this.authToken);
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}
