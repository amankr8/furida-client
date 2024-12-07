import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../interface/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl = 'http://localhost:8080/posts';

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
