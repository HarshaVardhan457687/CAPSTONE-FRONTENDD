import { Component } from '@angular/core';
import { Vendor } from './vendor.model';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent {
  vendors: Vendor[] = [
    { id: 1, name: 'Vendor A', remainingAmount: 500, amountPaid: 1500, contactDetails: 'vendorA@example.com', type: 'Catering' },
    { id: 1, name: 'Vendor A', remainingAmount: 500, amountPaid: 1500, contactDetails: 'vendorA@example.com', type: 'Catering' },
    { id: 1, name: 'Vendor A', remainingAmount: 500, amountPaid: 1500, contactDetails: 'vendorA@example.com', type: 'Catering' },
    { id: 2, name: 'Vendor B', remainingAmount: 800, amountPaid: 1200, contactDetails: 'vendorB@example.com', type: 'Venue' },
    { id: 2, name: 'Vendor B', remainingAmount: 800, amountPaid: 1200, contactDetails: 'vendorB@example.com', type: 'Venue' },
    { id: 2, name: 'Vendor B', remainingAmount: 800, amountPaid: 1200, contactDetails: 'vendorB@example.com', type: 'Venue' },
    { id: 3, name: 'Vendor C', remainingAmount: 250, amountPaid: 1750, contactDetails: 'vendorC@example.com', type: 'Photography' },
    { id: 3, name: 'Vendor C', remainingAmount: 250, amountPaid: 1750, contactDetails: 'vendorC@example.com', type: 'Photography' },
    { id: 3, name: 'Vendor C', remainingAmount: 250, amountPaid: 1750, contactDetails: 'vendorC@example.com', type: 'Photography' }
  ];

  filteredVendors: Vendor[] = this.vendors;
  searchTerm: string = '';
  selectedType: string = '';

  constructor() {}

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredVendors = this.vendors.filter(vendor => {
      const matchesSearch = this.searchTerm ? vendor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      const matchesType = this.selectedType ? vendor.type === this.selectedType : true;
      return matchesSearch && matchesType;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onTypeChange(): void {
    this.applyFilters();
  }

}
