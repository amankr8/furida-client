import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  apiUrl = environment.baseUrl + '/api/roles';

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
