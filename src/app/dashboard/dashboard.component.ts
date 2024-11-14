import { Component, OnInit } from '@angular/core';
import { Event } from '../add-event-form/Event';
import { EventService } from '../EventService';

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
          const [startDate, startTime] = item.startDate.split(' ');
          event.startDate = `${startDate} ${startTime}`;
        }
        if (item.endDate) {
          const [endDate, endTime] = item.endDate.split(' ');
          event.endDate = `${endDate} ${endTime}`;
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
