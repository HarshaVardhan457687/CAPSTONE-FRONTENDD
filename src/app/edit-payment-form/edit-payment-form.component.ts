import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Payment } from '../payment/payment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-edit-payment-form',
  templateUrl: './edit-payment-form.component.html',
  styleUrls: ['./edit-payment-form.component.css']
})
export class EditPaymentFormComponent { 
  @Input() payment!: Payment;
  @Input() vendorId!: string;
  @Output() close = new EventEmitter<void>();
  @Output() paymentUpdated = new EventEmitter<Payment>();

  paymentForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private vendorService: VendorService) {
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      method: ['', Validators.required],
      reference: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
    const [day, month, year] = this.payment.paymentDate.split('-');
    const formattedDate = `${year}-${month}-${day}`;

    this.paymentForm.patchValue({
      amount: this.payment.amount,
      date: formattedDate,
      method: this.payment.paymentType,
      reference: this.payment.referenceNumber
    });
  }

  private formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }

  onSubmit() {
    if (this.paymentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const updatedPayment: Payment = {
        id: this.payment.id,
        vendorId: this.vendorId,
        amount: this.paymentForm.value.amount,
        paymentDate: this.formatDate(this.paymentForm.value.date),
        paymentType: this.paymentForm.value.method.toUpperCase(),
        paymentStatus: this.payment.paymentStatus,
        referenceNumber: this.paymentForm.value.reference
      };

      this.vendorService.updatePayment(updatedPayment.id, updatedPayment, this.vendorId).subscribe({
        next: (response) => {
          this.paymentUpdated.emit(response);
          this.closeForm();
        },
        error: (error) => {
          console.error('Error updating payment:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  closeForm() {
    this.close.emit();
  }
}

