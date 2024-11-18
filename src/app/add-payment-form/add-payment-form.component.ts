import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Payment } from '../payment/payment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-add-payment-form',
  templateUrl: './add-payment-form.component.html',
  styleUrls: ['./add-payment-form.component.css']
})
export class AddPaymentFormComponent {
  @Input() vendorId!: string;
  @Output() close = new EventEmitter<void>();
  @Output() paymentAdded = new EventEmitter<Payment>();

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



  onSubmit() {
    if (this.paymentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const payment: Payment = {
        id: crypto.randomUUID(), 
        vendorId: this.vendorId,
        amount: this.paymentForm.value.amount,
        paymentDate: new Date(this.paymentForm.value.date).toISOString(),
        paymentType: this.paymentForm.value.method.toUpperCase(),
        paymentStatus: 'IN_PROCESS',
        referenceNumber: this.paymentForm.value.reference
      };  

      this.vendorService.createPayment(payment, this.vendorId).subscribe({
        next: () => {
          console.log("Payment saved")

        },
        error: (error) => {
          console.error('Error creating payment:', error);
        }
      });
      } 
    }  


    closeForm() {
      this.close.emit();
    }



}
