import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from '../event.service';

@Component({
  selector: 'app-add-budget-form',
  templateUrl: './add-budget-form.component.html',
  styleUrls: ['./add-budget-form.component.css']
})
export class AddBudgetFormComponent {  
  @Output() close = new EventEmitter<void>();
  @Input() eventId: any = null; 

  constructor(private eventService: EventService){}
  
  budget: any = {
    amount: ''
  };

  isSubmitting: boolean = false;

  closeForm(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
    if (!this.budget.amount) return;
    
    this.isSubmitting = true;

    this.closeForm();
  }
}
