import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  num: any[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  onClickSearch(){} 

  // filterResults(text: string) {
  //   if (!text) {
  //     this.filteredLocationList = this.housingLocationList;
  //     return;
  //   }
  
  //   this.filteredLocationList = this.housingLocationList.filter(
  //     housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
  //   );
  // } 
  showForm = false; 


  openForm() {
    this.showForm = true; 
  }

  closeForm() {
    this.showForm = false;
  }

}
