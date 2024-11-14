import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Guest } from './Guest';
import { GuestServiceService } from '../guest-service.service';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-guest-form',
  templateUrl: './add-guest-form.component.html',
  styleUrls: ['./add-guest-form.component.css']
})
export class AddGuestFormComponent { 

  @Output() close = new EventEmitter<void>();  
  @Output() formOpen = new EventEmitter<boolean>(); 
  isSubmitting = false 

  constructor(private guestService: GuestServiceService, private dialog: MatDialog){

  } 
  dietaryPreference: number = 0;

  ngOnInit() {
    this.formOpen.emit(true); 
  }

  closeForm() {
    this.close.emit();
  } 
  guest = {
    name: '',
    email: '',
    event: '',
    food: '',    
  };
  eventOptions = ['corporate'];
  foodIndicatorClass = 'veg-indicator';   
  

  validateName(event: any) {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(event.target.value)) {
      event.target.setCustomValidity('Not applicable');
    } else {
      event.target.setCustomValidity('');
    }
  }

  updateFoodType() {
    this.dietaryPreference = this.guest.food === 'VEG' ? 0 : 1;
  }

  validateForm(form: NgForm): boolean{ 
    return true;
  }

  onSubmit(form: NgForm) {
      if (this.validateForm(form)) {
        const newGuest = new Guest(
          null, this.guest.name, this.guest.email, this.dietaryPreference, 0, this.guest.event
        ) 
        this.isSubmitting = true;
        this.guestService.saveGuest(newGuest).subscribe({
          next: (response) => {
            this.isSubmitting = false;
            this.openDialog('Guest saved successfully!', true); 
            console.log(response)
          },
          error: (err) => {
            this.isSubmitting = false;
            this.openDialog('Failed to save the Guest. Please try again later.', false);
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
