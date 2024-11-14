import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../EventService';
import { MatDialog } from '@angular/material/dialog';
import { Event } from './Event';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent{
  eventName: any;
  eventDescription: any;
  startDate: any;
  closeFormm: any;
  endDate: any;
  startTime: any;
  endTime: any;
  eventType: any;
  venue: any;  
  isSubmitting: boolean = false;
  @Output() close = new EventEmitter<void>();


  closeForm() {
    this.close.emit();
  }  



  constructor(private eventService: EventService, private dialog: MatDialog) {}


  errorMessages = {
    eventName: '',
    eventDescription: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    venue: ''
  };

  formValid: boolean = true;

  resetErrorMessages() {
    this.errorMessages = {
      eventName: '',
      eventDescription: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      venue: ''
    };
  }

  validateForm(form: NgForm) {
    this.resetErrorMessages();

    let isValid = true;

    if (!this.eventName) {
      this.errorMessages.eventName = 'Event Name is required';
      isValid = false;
    }

    if (!this.eventDescription) {
      this.errorMessages.eventDescription = 'Event Description is required';
      isValid = false;
    }

    if (!this.startDate || !this.endDate || new Date(this.startDate) > new Date(this.endDate)) {
      this.errorMessages.startDate = 'Start Date must be earlier than or equal to End Date';
      isValid = false;
    }

    // Validate Start Time and End Time
    if (!this.startTime || !this.endTime || this.isStartTimeAfterEndTime()) {
      this.errorMessages.startTime = 'Start Time must be earlier than End Time';
      isValid = false;
    }

    // Validate Venue
    if (!this.venue) {
      this.errorMessages.venue = 'Venue is required';
      isValid = false;
    }

    this.formValid = isValid;
    return isValid;
  }

  isStartTimeAfterEndTime() {
    const start = new Date(this.startDate + ' ' + this.startTime);
    const end = new Date(this.endDate + ' ' + this.endTime);
    return start >= end;
  }


  onSubmit(form: NgForm) {
    if (this.validateForm(form)) {
      const newEvent = new Event(
        null,  
        'user-id',  
        this.eventName,
        this.venue,
        `${this.startDate} ${this.startTime}`,  
        `${this.endDate} ${this.endTime}`,  
        0, 
        0,
        this.eventDescription, 
        0,
        0,
        0
      ) 
      this.isSubmitting = true;
      this.eventService.saveEvent(newEvent).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.openDialog('Event saved successfully!', true); 
          console.log(response)
        },
        error: (err) => {
          this.isSubmitting = false;
          this.openDialog('Failed to save the event. Please try again later.', false);
          console.error(err);
        } 
      }); 
      this.closeForm();
    }  


  }
  openDialog(message: string, success: boolean): void {
    this.dialog.open(NotificationDialogComponent, {
      data: {
        message: message,
        success: success
      }
    });
  }


}


