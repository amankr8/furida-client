import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  signup(user: User): Observable<any> {
    return this.http.post(`${this.authUrl}/signup`, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, user).pipe(
      map((res: any) => {
        localStorage.setItem('jwtToken', res.token); // Save token to localStorage
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}
