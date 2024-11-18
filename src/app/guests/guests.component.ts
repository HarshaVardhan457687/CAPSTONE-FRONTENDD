import { Component, HostListener, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import { Guest } from '../add-guest-form/Guest';
import { Event as CustomEvent} from '../add-event-form/Event'; 
import { EventService } from '../event.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit{ 
  events: CustomEvent[] = [];
  guests: Guest[] = [];
  filteredGuests: Guest[] = [];
  selectedEventId: string = '';
  dropdownOpen = false;
  showForm = false;

  constructor(
    private eventService: EventService,
    private guestService: GuestService
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
        console.log('Events loaded:', events);
      },
      error: (err) => {
        console.error('Error loading events:', err);
      }
    });
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
    console.log('Dropdown state:', this.dropdownOpen);
  }

  selectOption(event: CustomEvent) {
    this.selectedEventId = event.id;
    this.dropdownOpen = false;
    this.loadGuests(this.selectedEventId);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownElement = document.querySelector('.dropdown');
    const targetElement = event.target as HTMLElement;
    
    if (dropdownElement && !dropdownElement.contains(targetElement)) {
      this.dropdownOpen = false;
    }
  }


  loadGuests(eventId: string) {

    this.guestService.getGuestsByEventId(eventId).subscribe({
      next: (guests) => {
        this.guests = guests;

      },
      error: (err) => {
        console.error('Error loading guests:', err);

      }
    });
  } 

  onGuestAdded(newGuest: Guest) {
    this.guests = [...this.guests, newGuest];
    if (this.selectedEventId) {
      this.loadGuests(this.selectedEventId);
    }
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    if (this.selectedEventId) {
      this.loadGuests(this.selectedEventId);
    }
  }
}
