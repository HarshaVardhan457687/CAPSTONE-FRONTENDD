import { Component, Input } from '@angular/core';
import { Vendor } from '../vendor/vendor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-card',
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.css']
})
export class VendorCardComponent {

  @Input() vendor!: Vendor;

  constructor(private router: Router) {}

  navigateToPayment(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.vendor && this.vendor.id) {
      console.log('Navigating to payment for vendor:', this.vendor.id);
      this.router.navigate(['/content/vendor/payment'], {
        queryParams: { vendorId: this.vendor.id }
      }).then(() => {
        console.log('Navigation completed');
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    } else {
      console.error('No vendor ID available');
    }
  }
}
