import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent {
  vendor = {
    name: '',
    email: '',
    vendorType: '',
    amountPaid: '',
    pendingAmount: ''
  };
  vendorTypeOptions = ['Supplier', 'Service', 'Freelancer'];

  validateName(event: any) {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(event.target.value)) {
      event.target.setCustomValidity('Not applicable');
    } else {
      event.target.setCustomValidity('');
    }
  }

  validateAmount(event: any) {
    const regex = /^[0-9]+$/;
    if (!regex.test(event.target.value)) {
      event.target.setCustomValidity('Only numbers allowed');
    } else {
      event.target.setCustomValidity('');
    }
  }

  onSubmit() {
    if (this.vendor.name && this.vendor.email && this.vendor.vendorType && this.vendor.amountPaid && this.vendor.pendingAmount) {
      console.log('Vendor Created:', this.vendor);
    }
  }
}
