import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminRouteService {
  constructor(private router: Router) {}

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  isLoginRoute(): boolean {
    return this.router.url.startsWith('/login');
  }
}
