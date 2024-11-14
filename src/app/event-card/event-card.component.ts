import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
}) 
export class EventCardComponent { 
  @Input() eventt: any;  

  menuVisible = false;
  showStatusDropdown = false;
  showTaskForm = false; 
  showGuestForm = false; 
  isFormOpen = false


  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  editEvent() {
    console.log('Edit event');
    this.closeMenu();
  }

  deleteEvent() {
    console.log('Delete event');
    this.closeMenu();
  }

  toggleStatusDropdown() {
    this.showStatusDropdown = !this.showStatusDropdown;
  }

  setStatus(status: string) {
    console.log(`Set status to ${status}`);
    this.closeMenu();
  }
  closeMenu() {
    this.menuVisible = false;
    this.showStatusDropdown = false;
  } 

  openTaskForm(){ 
    this.showTaskForm = true
  } 
  openGuestForm(){ 
    this.showGuestForm = true
  } 

  closeTaskForm(){ 
    this.showTaskForm = false
  } 
  closeGuestForm(){ 
    this.showGuestForm = false
  }  

  

}
