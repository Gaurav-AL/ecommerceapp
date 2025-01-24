import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private selectedPaymentMethodSource = new BehaviorSubject<string | null>(null);
  selectedPaymentMethod$ = this.selectedPaymentMethodSource.asObservable();

  constructor(private http: HttpClient) { }

  setSelectedPaymentMethod(method: string) {
    console.log(`Observable Payment Service `)
    this.selectedPaymentMethodSource.next(method);
  }
}
