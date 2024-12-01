import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../interface/project';
import { Message } from '../../interface/message';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = 'http://localhost:8080/messages';

  constructor(private http: HttpClient) {}

  sendMessage(msg: Message): Observable<any> {
    return this.http.post(this.apiUrl, msg);
  }

  getAllMessages(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  toggleReadStatus(id: number): Observable<any> {
    return this.http.put(this.apiUrl + `/${id}`, null);
  }

  deleteMessage(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${id}`);
  }

  deleteAllMessages(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}
