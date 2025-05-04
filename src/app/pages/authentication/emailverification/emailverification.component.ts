import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emailverification',
  standalone: true,
  imports: [],
  templateUrl: './emailverification.component.html',
  styleUrl: './emailverification.component.css'
})
export class EmailverificationComponent {
  otp: string = '';

  verifyOtp() {
    if (this.otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    // Call your API to verify OTP here
    console.log('Verifying OTP:', this.otp);
  }

  resendOtp() {
    // Call your API to resend OTP here
    console.log('Resending OTP');
  }
}
