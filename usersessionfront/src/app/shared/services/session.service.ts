import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Session {
  date: string;
  techStack: string;
  topics: string[];
}

@Injectable({ providedIn: 'root' })
export class SessionService {
 private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}/sessions/list`);
  }

  createSession(session: Session): Observable<Session> {
    return this.http.post<Session>(`${this.apiUrl}/sessions/new`, session);
  }

  deleteSession(id: number): Observable<void> {
   return this.http.delete<void>(`${this.apiUrl}/sessions/${id}`);
  }


 getUserEmail(): Observable<{ useremail: string }> {
  return this.http.get<{ useremail: string }>('http://localhost:3000/userget');
}
}
