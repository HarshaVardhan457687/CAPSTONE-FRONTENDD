import { Component, OnInit } from '@angular/core';
import { Event } from '../add-event-form/Event';
import { EventService } from '../event.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{  
 
  events: Event[] = [] 
  constructor(private eventService: EventService){
  } 
  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data.map((item) => {
        const event = new Event("", "", "", "", "", "", 0, 0, "", 0, 0, 0);
        event.id = item.id;
        event.userId = item.userId;
        event.name = item.name;
        event.location = item.location;
        event.description = item.description

        if (item.startDate) {
          console.log(item.startDate)
          const [date, time] = item.startDate.split(' ');
          const [year, day, month] = date.split('-');
          event.startDate = `${day}-${month}-${year} ${time}`;
        }
        
        if (item.endDate) { 
          console.log(item.endDate)
          const [date, time] = item.endDate.split(' ');
          const [day, month, year] = date.split('-');
          event.endDate = `${day}-${month}-${year} ${time}`;
        } 


        event.type = item.type;
        event.status = item.status;
        return event;

    });
  });
} 


  

  showForm = false;

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }
}
