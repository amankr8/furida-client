import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../interface/message';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = environment.baseUrl + '/api/messages';

  constructor(private http: HttpClient) {}

  sendMessage(msg: Message): Observable<any> {
    return this.http.post(this.apiUrl, msg);
  }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
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
