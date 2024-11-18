import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from './vendor/vendor.model';
import { catchError, Observable, throwError } from 'rxjs';
import { Payment } from './payment/payment.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'http://localhost:8097/vendor'; 

  constructor(private http: HttpClient) { }

  createVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, vendor)
      .pipe(catchError(this.handleError));
  }


  getVendorById(id: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  updateVendor(id: string, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/${id}`, vendor)
      .pipe(catchError(this.handleError));
  }

  deleteVendor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getVendorsByEventId(eventId: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}/event/${eventId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  getPaymentsByVendorId(vendorId: string): Observable<Payment[]> {
    const url = `${this.apiUrl}/payment/${vendorId}`;
    return this.http.get<Payment[]>(url)
  }
  createPayment(payment: Payment, vendorId: string | any): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/newpayment/${vendorId}`, payment)
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePayment(paymentId: string, vendorId: string | null): Observable<void> {
    const url = `${this.apiUrl}/deletepayment/${vendorId}/${paymentId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
}
