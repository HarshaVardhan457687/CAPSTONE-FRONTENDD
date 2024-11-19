import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guest } from './add-guest-form/Guest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestServiceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8094/guest'; 

  saveGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.apiUrl, guest);
  }

}
