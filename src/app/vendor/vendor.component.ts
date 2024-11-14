import { Component, OnInit } from '@angular/core';
import { Vendor } from './vendor.model';
import { EventService } from '../EventService';
import { Event } from '../add-event-form/Event';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
    vendors: Vendor[] = [];
    filteredVendors: Vendor[] = [];
    searchTerm: string = '';
    selectedType: string = '';
    selectedEvent: string = '';
    events: Event[] = [];

    constructor(private eventService: EventService) {}

    ngOnInit() {
        this.loadEvents();
        this.loadVendors();
    }

    loadEvents() {
        this.eventService.getAllEvents().subscribe(events => {
            this.events = events;
        });
    }

    loadVendors() {

    }

    onSearchChange() {
        this.filterVendors();
    }

    onTypeChange() {
        this.filterVendors();
    }

    onEventChange() {
        this.filterVendors();
    }

    filterVendors() {
        this.filteredVendors = this.vendors.filter(vendor => {
            const matchesSearch = !this.searchTerm || 
                vendor.name.toLowerCase().includes(this.searchTerm.toLowerCase());
            
            const matchesType = !this.selectedType || 
                vendor.type === this.selectedType;

            const matchesEvent = !this.selectedEvent || 
                vendor.eventId?.toString() === this.selectedEvent;

            return matchesSearch && matchesType && matchesEvent;
        });
    }

    // Your existing methods...
}