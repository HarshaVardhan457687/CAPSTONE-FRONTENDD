import { Component } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  menuVisible = false;
  showStatusDropdown = false;

  // Sample data for the card, replace with actual data as needed
  event = {
    date: '12/12/2012',
    name: 'Event Name',
    description: 'Event description goes here, giving a brief overview of the event’s purpose and highlights.',
    participants: 50,
    tasksCompleted: 4,
    totalTasks: 5,
    location: 'Bangalore'
  };

  // Method to toggle the menu visibility
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  // Method to edit the event
  editEvent() {
    console.log('Edit event');
    this.closeMenu();
  }

  // Method to delete the event
  deleteEvent() {
    console.log('Delete event');
    this.closeMenu();
  }

  // Method to toggle the status dropdown within the menu
  toggleStatusDropdown() {
    this.showStatusDropdown = !this.showStatusDropdown;
  }

  // Method to set the event status
  setStatus(status: string) {
    console.log(`Set status to ${status}`);
    this.closeMenu();
  }

  // Method to close the menu after an action
  closeMenu() {
    this.menuVisible = false;
    this.showStatusDropdown = false;
  }
}
