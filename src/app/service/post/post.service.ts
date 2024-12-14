import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl = environment.baseUrl + '/api/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createPost(postData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, postData);
  }

  updatePost(id: number, postData: FormData): Observable<any> {
    return this.http.put(this.apiUrl + `/${id}`, postData);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
