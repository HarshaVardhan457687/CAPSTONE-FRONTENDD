import { Component } from '@angular/core';

@Component({
  selector: 'app-add-guest-form',
  templateUrl: './add-guest-form.component.html',
  styleUrls: ['./add-guest-form.component.css']
})
export class AddGuestFormComponent {
  guest = {
    name: '',
    email: '',
    event: '',
    food: 'veg',
    place: ''
  };
  eventOptions = ['Wedding', 'Birthday', 'Conference'];
  placeOptions = ['Hall 1', 'Hall 2', 'Outdoor'];
  foodIndicatorClass = 'veg-indicator';  // Default to veg indicator

  validateName(event: any) {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(event.target.value)) {
      event.target.setCustomValidity('Not applicable');
    } else {
      event.target.setCustomValidity('');
    }
  }

  updateFoodType() {
    this.foodIndicatorClass = this.guest.food === 'veg' ? 'veg-indicator' : 'nonveg-indicator';
  }

  onSubmit() {
    if (this.guest.name && this.guest.email && this.guest.event && this.guest.food && this.guest.place) {
      console.log('Guest Created:', this.guest);
    }
  }
}
