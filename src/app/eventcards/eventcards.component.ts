import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eventcards',
  templateUrl: './eventcards.component.html',
  styleUrls: ['./eventcards.component.css']
})
export class EventcardsComponent {
  @Input() item: any; 
  showForm = false;  
  dropdownVisible = false;


  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  } 
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  updateItem() {
    console.log('Update item');
  }

  deleteItem() {
    console.log('Delete item');
  }

  setStatus(status: string) {
    console.log('Set status to', status);
    this.dropdownVisible = false; 
  }
}
