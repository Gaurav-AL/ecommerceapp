import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from '../checkout/checkout.component';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartDetailsComponent } from '../cart-details/cart-details.component';
import { Observable, Subject } from 'rxjs';
import { CheckOutServicesService } from '../../services/check-out-services.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartItems } from '../../common/cart-items';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-review-order',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule,RouterModule],
  templateUrl: './review-order.component.html',
  styleUrl: './review-order.component.css',
  providers:[CheckoutComponent,DatePipe]
})
export class ReviewOrderComponent implements OnInit{
    checkOutFormGroup!: FormGroup;
    firstName : string = 'Gaurav';
    lastName :  string = 'Chaudhary';
    email : string  = 'reverse454@gmail.com';
    billingStreetAddress :  string = '';
    mobileno :  number = +91;
    orderNo: number = 0;
    billingDistrict!: string;
    billingState!: string;
    billingCountry!: string;
    billingPincode!: number;
    shippingStreetAddress :  string = '';
    shippingDistrict!: string;
    shippingState!: string;
    shippingCountry!: string;
    shippingPincode!: number;
    totalPrice: number = 0.00;
    totalQuantity: number = 0;
    cartItems : CartItems[]= [];
    formattedDate!: string;
    paymentMethod :  string | null | undefined;
    paymentDetails: string = '';
    cardNumber :  string='';

    constructor(private checkOutService :  CheckOutServicesService,
                private cartServices :  CartService,
                private datePipe: DatePipe,
                private paymentService: PaymentService
  
    ){}
  ngOnInit(): void {
    this.getCurrentDate();

    this.checkOutService.formGroup$.subscribe(formGroup => {
      if (formGroup) {
        this.checkOutFormGroup = formGroup;
      }
    });

    /* Customer Information */
    this.firstName = this.checkOutFormGroup.get('customer')?.value.firstName;
    this.lastName = this.checkOutFormGroup.get('customer')?.value.lastName;
    this.email = this.checkOutFormGroup.get('customer')?.value.email;
    this.mobileno = this.checkOutFormGroup.get('customer')?.value.mobileNo;
    this.orderNo = this.getUniqueFourDigitNumber();
    /* Billing variables */
    this.billingStreetAddress  = this.checkOutFormGroup.get('billingAddress')?.value.streetAddress;
    this.billingState = this.checkOutFormGroup.get('billingAddress')?.value.stateName;
    this.billingDistrict = this.checkOutFormGroup.get('billingAddress')?.value.districtName;
    this.billingCountry = this.checkOutFormGroup.get('billingAddress')?.value.countryName;
    this.billingPincode = this.checkOutFormGroup.get('billingAddress')?.value.pincode;
    /* Shipping Variables */
    this.shippingStreetAddress  = this.checkOutFormGroup.get('shippingAddress')?.value.streetAddress;
    this.shippingState = this.checkOutFormGroup.get('shippingAddress')?.value.stateName;
    this.shippingDistrict = this.checkOutFormGroup.get('shippingAddress')?.value.districtName;
    this.shippingCountry = this.checkOutFormGroup.get('shippingAddress')?.value.countryName;
    this.shippingPincode = this.checkOutFormGroup.get('shippingAddress')?.value.pincode;
    /*Getting total Price and quantity and first subscriber, then changes with compute total method */
    this.cartItems = this.cartServices.cartItems;
    this.cartServices.totalPrice.subscribe(value=>{
      this.totalPrice = value;
    })
    this.cartServices.totalQuantity.subscribe(
      value=>{
        this.totalQuantity = value;
      }
    );
    this.cartServices.computeTotal(this.cartItems);
    /**Gathering Payment related Information */
    this.paymentService.selectedPaymentMethod$.subscribe(value => {
      this.paymentMethod = value;
    });
    console.log(`Payment Method : ${this.paymentMethod}`);
    if(this.paymentMethod === 'upi'){
        this.paymentDetails = this.checkOutFormGroup?.get('upi')?.value.upiId;
    }else if(this.paymentMethod == 'debitCard'){
        this.cardNumber = this.checkOutFormGroup?.get('debitCard')?.value?.debitCardNumber;
        this.cardNumber.slice(0,8);
        this.paymentDetails = this.cardNumber;
    }else{
      this.cardNumber = this.checkOutFormGroup?.get('creditCard')?.value?.creditCardNumber;
        this.cardNumber.slice(0,8);
        this.paymentDetails = this.cardNumber;
    }
    console.log(`Payment Details : ${this.paymentDetails}`);
  }
  getUniqueFourDigitNumber(): number {
    const digits: number[] = [];
    
    // Generate 4 unique digits
    while (digits.length < 4) {
      const randomDigit = Math.floor(Math.random() * 10);
      
      // Ensure the digit is not already in the array
      if (!digits.includes(randomDigit)) {
        digits.push(randomDigit);
      }
    }
  
    // Combine the digits into a single number
    return parseInt(digits.join(''), 10);
  }

  getCurrentDate() {
    const currentDate = new Date(); // Get current date
    this.formattedDate = this.datePipe.transform(currentDate, 'MMMM d, y') || ''; // Format date
  }
  
} 
