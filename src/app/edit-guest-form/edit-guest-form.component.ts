import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Guest } from '../add-guest-form/Guest';
import { GuestService } from '../guest.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-guest-form',
  templateUrl: './edit-guest-form.component.html',
  styleUrls: ['./edit-guest-form.component.css']
})
export class EditGuestFormComponent implements OnInit{ 
  @Input() guest!: Guest;
  @Input() eventId!: string;
  @Output() close = new EventEmitter<void>();
  @Output() guestUpdated = new EventEmitter<Guest>();
  @ViewChild('guestForm') guestForm!: NgForm;

  editedGuest: any = {
    name: '',
    email: '',
    dietaryPreference: 0
  };

  isSubmitting = false;

  constructor(private guestService: GuestService) {}

  ngOnInit() {
    this.editedGuest = {
      ...this.guest
    };
  }

  closeForm() {
    this.close.emit();
  }

  onSubmit() {
    if (this.isSubmitting || this.guestForm.invalid) return;
    this.isSubmitting = true;


    const formValues = this.guestForm.value;

    const updatedGuest: Guest = {
      id: this.guest.id,
      name: formValues.name,
      contactEmail: formValues.email,
      dietaryPreference: formValues.dietaryPreference,
      rsvpStatus: this.guest.rsvpStatus,
      eventId: this.guest.eventId
    };

    this.guestService.updateGuest(this.guest.id, updatedGuest).subscribe({
      next: (response) => {
        console.log('Guest updated successfully:', response);
        this.guestUpdated.emit(response);
        this.closeForm();
      },
      error: (error) => {
        console.error('Error updating guest:', error);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
