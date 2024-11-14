import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../EventService';
import { Event } from '../add-event-form/Event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
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
        event.totalGuests = item.totalGuests 
        event.taskCompleted = item.taskCompleted
        event.totalTask = item.totalTask

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
  onClickSearch(){} 
  showForm = false; 
  openForm() {
    this.showForm = true; 
  }

  closeForm() {
    this.showForm = false;
  } 

  

}
