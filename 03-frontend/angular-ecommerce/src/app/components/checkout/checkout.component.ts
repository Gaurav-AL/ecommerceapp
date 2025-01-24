import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { ShopchatService } from '../../services/shopchat.service';
import { Console } from 'node:console';
import { Country } from '../../common/country';
import { State } from '../../common/state';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,  CommonModule, FormsModule,RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers:[HttpClient]
})
export class CheckoutComponent implements OnInit {
    showRadioButtons = false;
    checkOutFormGroup!: FormGroup;
    firstNamePlaceholder: string = "First Name";
    lastNamePlaceholder: string = "Last Name";
    emailPlaceholder: string = "Email";
    mobileNoPlaceholder: string = "Mobile Number";

    PaymentCardMonth : number[] = [];
    PaymentCardYear: number[] = [];
    paymentMethod :  string | null | undefined;
    startMonth:  number = new Date().getMonth() + 1;
    // In your component where payment method is selected

    countries: Country[] = [];
    states: State[] = [];
  
    
  
    selectedState: string = ''; // Property to bind selected state
    constructor(private FormBuilder: FormBuilder,
            private router: Router,
            private checkOutService :  CheckOutServicesService,
            private paymentServices: PaymentService,
            private shopChatService: ShopchatService,
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
              expirationMonth:[''],
              expirationYear: ['']
            }),
            creditCard: this.FormBuilder.group({
              creditCardType: [''],
              nameOnCreditCard: [''],
              creditCardNumber: [''],
              cvv: [''],
              pin: [''],
              expirationMonth:[''],
              expirationYear: ['']
            })
        });
        // Set the initial payment method in the service
        const selectedPaymentMethod = this.checkOutFormGroup?.get('selectedPaymentMethod')?.value;
        this.paymentServices?.setSelectedPaymentMethod(selectedPaymentMethod);  // Update the service with the initial value

        // Subscribe to changes in the payment method control and update the service accordingly
        this.checkOutFormGroup?.get('selectedPaymentMethod')?.valueChanges.subscribe(value => {
          this.paymentServices?.setSelectedPaymentMethod(value);
        });
        this.paymentServices?.selectedPaymentMethod$.subscribe(value => {
          this.paymentMethod = value;
          console.log(`Payment Method : ${this.paymentMethod}`);
        });

        this.shopChatService?.getPaymentCardYear().subscribe(value=>{
          console.log(`PaymentCardYear : ${value}`);
          this.PaymentCardYear =value;
        });
        this.shopChatService?.getPaymentCardMonths(this.startMonth).subscribe(
          value=>{
          console.log(`PaymentCardMonths : ${value}`);
          this.PaymentCardMonth = value;
        })
        this.shopChatService?.getCountries().subscribe(
          value=>{
          console.log(`Countries Retrieved: ${value}`);
          this.countries = value;
        })
        this.checkOutService?.setCheckOutFormGroup(this.checkOutFormGroup!);
    }
    handleMonthsAndYear() {
      let startYear = new Date().getFullYear();
      let startMonth = new Date().getMonth() + 1;
      
      console.log(`Inside handleMonthsAndYear() method ${this.paymentMethod}`)
      if(this.paymentMethod == 'debitCard'){
        
        let expirationYear = this.checkOutFormGroup?.get('debitCard')?.get('expirationYear')?.value;
        console.log(`Current year selected: ${expirationYear}, Start Year: ${startYear}`);
        if(expirationYear == startYear) {
          startMonth = new Date().getMonth() + 1; // Set startMonth to the current month
        } else {
          startMonth = 1; // Reset startMonth to 1 if it's not the current year
        }
        this.shopChatService?.getPaymentCardMonths(startMonth).subscribe(
          value=>{
          console.log(`PaymentCardMonths : ${value}`);
          this.PaymentCardMonth = value;
        })
      }else if(this.paymentMethod == 'creditCard') {
        let expirationYear = this.checkOutFormGroup?.get('creditCard')?.get('expirationYear')?.value;
        
        console.log(`Current year selected: ${expirationYear}, Start Year: ${startYear}`);
        if (expirationYear == startYear) {
          startMonth = new Date().getMonth() + 1; // Set startMonth to the current month
        } else {
          startMonth = 1; // Reset startMonth to 1 if it's not the current year
        }
        this.shopChatService?.getPaymentCardMonths(startMonth).subscribe(
          value=>{
          console.log(`PaymentCardMonths : ${value}`);
          this.PaymentCardMonth = value;
        })
    }
    
    }
    onSubmit() {
      console.log('handling submitted data');
      console.log(this.checkOutFormGroup?.get('customer')?.value);
      const selectedMethod = this.checkOutFormGroup?.get('selectedPaymentMethod')?.value;
      if (selectedMethod) {
          this.paymentServices?.setSelectedPaymentMethod(selectedMethod);
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
        if(this.checkOutFormGroup?.get('selectedOption')?.value === 'hide' ){
          this.copyShippingAddressToBillingAddress();
        }
      }
    } else {
      this.showRadioButtons = false;
    }
  }
  copyShippingAddressToBillingAddress(){
    this.checkOutFormGroup?.controls['billingAddress']?.setValue(this.checkOutFormGroup?.controls['shippingAddress']?.value);
    console.log(`this.checkOutFormGroup?.get('billingAddress')?.value : ${this.checkOutFormGroup?.get('billingAddress')?.value}`);
    
  }
  getStates(FormGroupName :   string){ 
    console.log(`FormGroupName : ${FormGroupName}`);
    const countryCode = this.checkOutFormGroup?.get(FormGroupName)?.value.countryName.code ;
    console.log(`Country Code : ${countryCode}`);
    this.shopChatService?.getStates(countryCode).subscribe(
      value=>{
        console.log(`States Retrieved: ${value}`);
        this.states = value;
      }
    )
  }
}

