import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guest } from './add-guest-form/Guest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private apiUrl = 'http://localhost:8092/guest';

  constructor(private http: HttpClient) { }


  saveGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.apiUrl, guest);
  }

  getGuestById(id: string): Observable<Guest> {
    return this.http.get<Guest>(`${this.apiUrl}/${id}`);
  }

  getAllGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.apiUrl);
  }

  updateGuest(id: string, guest: Guest): Observable<Guest> {
    return this.http.put<Guest>(`${this.apiUrl}/${id}`, guest);
  }

  deleteGuest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getGuestsByEventId(eventId: string): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}/event/${eventId}`);
  }


  getGuestsByDietaryPreference(dietaryPreference: string): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}/diet/${dietaryPreference}`);
  }

  
  // createGuestGroup(guestGroup: GuestGroup): Observable<GuestGroup> {
  //   return this.http.post<GuestGroup>(`${this.apiUrl}/group`, guestGroup);
  // }

  // getGuestGroupById(id: string): Observable<GuestGroup> {
  //   return this.http.get<GuestGroup>(`${this.apiUrl}/group/${id}`);
  // }

  // getAllGuestGroups(): Observable<GuestGroup[]> {
  //   return this.http.get<GuestGroup[]>(`${this.apiUrl}/groups`);
  // }

  // updateGuestGroup(id: string, guestGroup: GuestGroup): Observable<GuestGroup> {
  //   return this.http.put<GuestGroup>(`${this.apiUrl}/group/${id}`, guestGroup);
  // }

  // deleteGuestGroup(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/group/${id}`);
  // }

  // getGuestGroupsByEventId(eventId: string): Observable<GuestGroup[]> {
  //   return this.http.get<GuestGroup[]>(`${this.apiUrl}/group/event/${eventId}`);
  // }
}
