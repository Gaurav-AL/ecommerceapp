import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
})
export class LoginComponent  implements OnInit{
  loginForm: FormGroup;
  countdown: number = 0;
  otpSending: boolean = false;
  otpSent: boolean = false;
  otpButtonLabel: string = 'Send OTP';
  countdownSubscription: Subscription | null = null; // Store the subscription

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      otp: ['', Validators.required],
      loginType: ['password', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loginForm.get('loginType')?.valueChanges.pipe(debounceTime(300)).subscribe((loginType) => {
      if (loginType === 'otp') {
        this.resetOTPState();
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login data:', formData);
    }
  }

  onLoginTypeChange(type: string): void {
    if (type === 'password') {
      this.resetOTPState();
    }
  }

  onSendOTP(): void {
    this.otpSending = true;
    this.otpButtonLabel = 'Sending...';
    setTimeout(() => {
      this.otpSent = true;
      this.otpSending = false;
      this.otpButtonLabel = 'Verify OTP';
      this.startCountdown();
    }, 2000); // Simulating OTP sending with a delay of 2 seconds
  }

  onResendOTP(): void {
    // Reset the countdown and resend OTP
    this.resetOTPState();
    this.onSendOTP();
  }

  startCountdown(): void {
    this.countdown = 60;
    const countdown$ = interval(1000);
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe(); // Unsubscribe from the previous countdown
    }
    this.countdownSubscription = countdown$.subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        if (this.countdownSubscription) {
          this.countdownSubscription.unsubscribe();
        }
        this.otpButtonLabel = 'Resend OTP';
      }
    });
  }

  resetOTPState(): void {
    this.otpSent = false;
    this.otpSending = false;
    this.countdown = 0;
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe(); // Clean up subscription if needed
    }
    this.countdownSubscription = null; // Reset the subscription
    this.otpButtonLabel = 'Send OTP';
  }

  // Determines if the "Verify OTP" button should be enabled
  isVerifyButtonEnabled(): boolean {
    return this.otpSent && this.countdown === 0;
  }

  // Determines if the "Send OTP" button should be enabled
  isSendButtonEnabled(): boolean {
    return !this.otpSending && this.countdown === 0;
  }

  // Determines if the "Resend OTP" button should be enabled
  isResendButtonEnabled(): boolean {
    return this.countdown === 0;
  }
}
