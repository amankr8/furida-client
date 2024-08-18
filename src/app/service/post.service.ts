import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interface/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  base_url = 'http://localhost:8080/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get(this.base_url);
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(this.base_url, post);
  }
}
