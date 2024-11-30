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

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(this.apiUrl + `/${id}`);
  }

  createPost(postDto: FormData): Observable<any> {
    return this.http.post(this.apiUrl, postDto);
  }

  updatePost(id: number, postDto: FormData): Observable<Post> {
    return this.http.put<Post>(this.apiUrl + `/${id}`, postDto);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
