import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../interface/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl = 'http://localhost:8080/projects';

  constructor(private http: HttpClient) {}

  addProject(project: Project): Observable<any> {
    return this.http.post(this.apiUrl, project);
  }

  getAllProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
