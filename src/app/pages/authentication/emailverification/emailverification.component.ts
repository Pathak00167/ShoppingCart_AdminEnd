import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthserviceService } from '../../../../services/authservice.service'; 
import { HttpClient } from '@angular/common/http';  


@Component({
  selector: 'app-emailverification',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './emailverification.component.html',
})
export class EmailverificationComponent {
  email: string | null = null;
  otp: string = '';
  

  constructor(private router: Router,private service: AuthserviceService) {
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation?.extras.state?.['email'] || null;
    console.log('Email (from navigation state):', this.email);
  }

  verifyOtp() {debugger
    if (this.otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    const payload = {
      email: this.email,  // (you should have the email available in component)
      otp: this.otp
    };
  
    this.service.confirmEmail(payload).subscribe(response => {
       sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('role', response.role);
      this.router.navigate(['vendor-verification']);
      console.log('OTP verified successfully:', response);
    }, error => {
      console.error('OTP verification failed:', error);
    });
  }

  resendOtp() {
    // Call your API to resend OTP here
    console.log('Resending OTP');
  }
}
