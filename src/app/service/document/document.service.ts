import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../../interface/document';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  apiUrl = environment.baseUrl + '/api/documents';

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl);
  }

  getDocumentsByProjectId(projectId: number): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl + `/project/${projectId}`);
  }

  addDocument(docData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, docData);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${id}`);
  }

  updateDocument(id: number, docData: FormData): Observable<any> {
    return this.http.put(this.apiUrl + `/${id}`, docData);
  }
}
