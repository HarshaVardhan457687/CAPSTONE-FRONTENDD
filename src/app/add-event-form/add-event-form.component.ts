import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent {
  eventName: any;
  eventDescription: any;
  startDate: any;
  closeFormm: any;
  endDate: any;
  startTime: any;
  endTime: any;
  eventType: any;
  venue: any; 
  @Output() close = new EventEmitter<void>();

  closeForm() {
    this.close.emit();
  }

}
