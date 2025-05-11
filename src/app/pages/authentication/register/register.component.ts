import { Component } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../../services/authservice.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  Registerform :FormGroup
  errorMessage: string | null = null;
  constructor( private fb:FormBuilder , private service:AuthserviceService, private router:Router) {
this.Registerform = this.fb.group({
  fullName:['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    role: ['Vendor'] 
  });
  }

  registeruser() {
    this.errorMessage = null;  // Reset the error message
  
    if (this.Registerform.valid) {
      this.service.Register(this.Registerform.value).subscribe({
        next: (response) => {
          const email = this.Registerform.value.email;
          sessionStorage.setItem('VendorState', "Verification");
          this.router.navigate(['otp-verification'], {
            state: { email: this.Registerform.value.email }
          });
  
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = 'Invalid data. Please check and try again.';
          } else {
            this.errorMessage = 'Registration failed. Please try again later.';
          }
        }
      });
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }
  
}


