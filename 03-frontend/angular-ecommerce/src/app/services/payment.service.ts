import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private selectedPaymentMethodSource = new BehaviorSubject<string | null>(null);
  selectedPaymentMethod$ = this.selectedPaymentMethodSource.asObservable();

  setSelectedPaymentMethod(method: string) {
    this.selectedPaymentMethodSource.next(method);
  }
}
