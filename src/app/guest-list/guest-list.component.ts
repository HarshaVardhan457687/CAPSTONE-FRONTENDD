import { Component } from '@angular/core';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent { 
  guestName: string = 'John Doe';
  dietaryPreference: string = 'Vegetarian';
  rsvpSent: boolean = false; 

  sendRsvp() {
    if (!this.rsvpSent) {
      this.rsvpSent = true;
      console.log("RSVP sent for:", this.guestName);
    }
  }


  sendReminders() {
    // Logic to handle sending reminders
    console.log("Reminders sent to:", this.guestName);
  }

  // Method to handle editing guest details
  editGuest() {
    // Logic for editing guest information
    console.log("Editing guest:", this.guestName);
  }

  // Method to delete guest entry
  deleteGuest() {
    // Logic to delete guest entry
    console.log("Guest deleted:", this.guestName);
  }
}

