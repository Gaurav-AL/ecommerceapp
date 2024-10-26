import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReviewOrderComponent } from '../review-order/review-order.component';
import { CartDetailsComponent } from '../cart-details/cart-details.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CheckOutServicesService } from '../../services/check-out-services.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule,RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers:[]
})
export class CheckoutComponent implements OnInit {
    showRadioButtons = false;
    checkOutFormGroup!: FormGroup;
    firstNamePlaceholder: string = "First Name";
    lastNamePlaceholder: string = "Last Name";
    emailPlaceholder: string = "Email";
    mobileNoPlaceholder: string = "Mobile Number";

    readonly states: string[] = [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
      'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
      'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 
      'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 
      'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 
      'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 
      'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 
      'Puducherry', 'Ladakh', 'Jammu and Kashmir'
    ];
  
    selectedState: string = ''; // Property to bind selected state
    constructor(private FormBuilder: FormBuilder,
            private router: Router,
            private checkOutService :  CheckOutServicesService,
            private paymentServices: PaymentService
    ){ }

    ngOnInit(): void {
        this.checkOutFormGroup = this.FormBuilder.group({
            selectedOption: ['hide'],
            selectedPaymentMethod : ['upi'],
            customer: this.FormBuilder.group({
              firstName: ['',Validators.required],
              lastName: ['',Validators.required],
              email: [''],
              mobileNo: ['',Validators.required]
            }),
            shippingAddress: this.FormBuilder.group({
              countryName:['',Validators.required],
              stateName : ['',Validators.required],
              cityName : ['',Validators.required],
              districtName: ['',Validators.required],
              streetAddress: ['',Validators.required],
              pincode:['',Validators.required]
            }),
            billingAddress: this.FormBuilder.group({
              countryName:['',Validators.required],
              stateName : ['',Validators.required],
              cityName : ['',Validators.required],
              districtName: ['',Validators.required],
              streetAddress: ['',Validators.required],
              pincode:['',Validators.required]
            }),
            upi : this.FormBuilder.group({
              upiId : ['']
            }),
            debitCard: this.FormBuilder.group({
              debitCardType: [''],
              nameOnDebitCard: [''],
              debitCardNumber : [''],
              cvv: [''],
              pin: [''],
              validFrom:[''],
              validTill: ['']
            }),
            creditCard: this.FormBuilder.group({
              creditCardType: [''],
              nameOnCreditCard: [''],
              creditCardNumber: [''],
              cvv: [''],
              pin: [''],
              validFrom:[''],
              validTill: ['']
            })
        });
        this.checkOutService.setCheckOutFormGroup(this.checkOutFormGroup);
    }
    
    onSubmit() {
      console.log('handling submitted data');
      console.log(this.checkOutFormGroup.get('customer')?.value);
      const selectedMethod = this.checkOutFormGroup.get('selectedPaymentMethod')?.value;
      if (selectedMethod) {
          this.paymentServices.setSelectedPaymentMethod(selectedMethod);
      }
      this.router.navigate(['/review-order']);
    }
     // Listen for window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let flag:boolean =false;
    // Show radio buttons when the user scrolls down by at least 100 pixels
    if (scrollPosition > 200) {
      this.showRadioButtons = true;
      if(scrollPosition > 300 && scrollPosition <= 500 ){
        if(this.checkOutFormGroup.get('selectedOption')?.value === 'hide' ){
          this.copyShippingAddressToBillingAddress();
        }
      }
    } else {
      this.showRadioButtons = false;
    }
  }
  copyShippingAddressToBillingAddress(){
    this.checkOutFormGroup.controls['billingAddress'].setValue(this.checkOutFormGroup.controls['shippingAddress'].value);
    console.log(this.checkOutFormGroup.get('billingAddress')?.value);
    
  }

}

