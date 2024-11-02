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
  private authUrl = 'http://localhost:8080/auth'; // Change to your Spring Boot API base URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  signup(user: User): Observable<any> {
    console.log(user);
    return this.http.post(`${this.authUrl}/signup`, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(this.getErrorMessage(err)));
      })
    );
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, user).pipe(
      map((response: any) => {
        localStorage.setItem('jwtToken', response.token); // Save token to localStorage
        return response;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(this.getErrorMessage(err)));
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

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 400) {
      return 'Invalid input. Please check your details.';
    } else if (error.status === 401) {
      return 'Unauthorized. Invalid username or password.';
    } else if (error.status === 500) {
      return 'Internal server error. Please try again later.';
    } else {
      return 'Something went wrong. Please try again.';
    }
  }
}
