import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
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
    console.log('Debug: ', user);
    return this.http.post(`${this.authUrl}/signup`, user);
  }

  signin(user: User): Observable<any> {
    return this.http.post(`${this.authUrl}/signin`, user).pipe(
      map((response: any) => {
        localStorage.setItem('jwtToken', response.token); // Save token to localStorage
        return response;
      })
    );
  }

  signout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}
