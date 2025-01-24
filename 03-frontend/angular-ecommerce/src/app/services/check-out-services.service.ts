import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ShopchatService } from './shopchat.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOutServicesService {

  formGroupSubject = new BehaviorSubject<FormGroup | null>(null);
  formGroup$ = this.formGroupSubject.asObservable();

  setCheckOutFormGroup(formGroup: FormGroup) {
    this.formGroupSubject.next(formGroup);
  }
  constructor(private fb: FormBuilder,
            private httpClient: HttpClient,
            private shopchat: ShopchatService
  ) { 
  }

  initializeFormGroup(): void {
    const formGroup = this.fb.group({
      customer: this.fb.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        mobileNo: [''],
      }),
      billingAddress: this.fb.group({
        streetAddress: [''],
        stateName: [''],
        districtName: [''],
        countryName: [''],
        pincode: [''],
      }),
      shippingAddress: this.fb.group({
        streetAddress: [''],
        stateName: [''],
        districtName: [''],
        countryName: [''],
        pincode: [''],
      }),
      paymentMethod: [''],
      upi: this.fb.group({
        upiId: [''],
      }),
      debitCard: this.fb.group({
        debitCardNumber: [''],
      }),
      creditCard: this.fb.group({
        creditCardNumber: [''],
      }),
    });
    
  }
}
