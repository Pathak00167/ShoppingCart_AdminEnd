import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
constructor(private fb: FormBuilder,private service:AuthserviceService, private router:Router) 
{ 
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
}

onLogin() {
  debugger;
  this.errorMessage = null;  // Reset the error message before a new login attempt

  if (this.loginForm.valid) {
    this.service.login(this.loginForm.value).subscribe(response => {
      const loginData = response.loginTry;

      if (loginData?.role === 'Admin') {
        // Save the token and navigate to the admin page
        sessionStorage.setItem('token', loginData.token);
        sessionStorage.setItem('role', loginData.role);
        this.router.navigate(['instructions']);
      
      } else if (loginData?.role === 'User') {
        // Save the token and navigate to the user dashboard
        sessionStorage.setItem('token', loginData.token);
        sessionStorage.setItem('role', loginData.role);
        this.router.navigate(['instruction']); // Optional: navigate somewhere for users
      
      } else {
        this.errorMessage = 'Access denied. Only admin can log in.';
      }

    }, error => {
      this.errorMessage = 'Login failed. Please check your credentials and try again.';
    });
  }
}

}
