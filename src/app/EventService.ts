import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';  
import { Event } from './add-event-form/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8095/event';

  constructor(private http: HttpClient) {}

  saveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  } 
  testEvent():Observable<String>{  
    return this.http.get<String>(this.apiUrl + "/test")
  } 
  getAllEvents():Observable<Event[]>{ 
    return this.http.get<Event[]>(this.apiUrl)
  }
}
