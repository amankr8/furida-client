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

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(this.apiUrl + `/${id}`);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(this.apiUrl + `/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
