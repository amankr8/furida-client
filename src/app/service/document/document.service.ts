import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  apiUrl = 'http://localhost:8080/documents';

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<any> {
    return this.http.get(this.apiUrl);
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
