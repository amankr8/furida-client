import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interface/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl = 'http://localhost:8080/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(this.apiUrl + `/${id}`);
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(this.apiUrl, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(this.apiUrl + `/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
