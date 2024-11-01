import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  apiUrl = 'http://localhost:8080/roles';

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
