import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EventUser } from 'src/app/EventUser.model';
import { EventUserRequest } from './event-user-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8094/user'; 

  constructor(private http: HttpClient) { }

  signup(user: EventUser): Observable<EventUser> {
    return this.http.post<EventUser>(`${this.apiUrl}/auth/create`, user);
  } 

  login(email: string, password: string): Observable<string> {
    const loginRequest = new EventUserRequest(email, password);
    
    return this.http.post<string>(`${this.apiUrl}/auth/login`, loginRequest)
      .pipe(
        tap(token => {
          localStorage.setItem('token', token);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
