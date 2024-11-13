import { Component } from '@angular/core';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent { 
  onClickSearch(){}
  num: any[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    this.dropdownOpen = false; 
  }
}
