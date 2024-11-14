import { Component } from '@angular/core';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent { 
  onClickSearch(){}
  dropdownOpen: boolean = false;
  selectedEvent: string = '';
  num: number[] = [1, 2, 3, 4, 5]; // Example array for guest list items

  // Toggle the dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Select an option from the dropdown
  selectOption(option: string) {
    this.selectedEvent = option;
    this.dropdownOpen = false; 
    
  } 
  showForm = false;

  openForm() {
    this.showForm = true;
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeForm() {
    this.showForm = false;
    // Restore scrolling when modal is closed
    document.body.style.overflow = 'auto';
  }
}
