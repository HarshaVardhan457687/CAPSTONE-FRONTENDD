import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../add-event-form/Event';
import { EventService } from '../event.service';

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
          const [date, time] = item.startDate.split(' ');
          const [year, day, month] = date.split('-');
          event.startDate = `${year}-${month}-${day} ${time}`;
        }
        
        if (item.endDate) {
          const [date, time] = item.endDate.split(' ');
          const [year, day, month] = date.split('-');
          event.endDate = `${year}-${month}-${day} ${time}`;
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
