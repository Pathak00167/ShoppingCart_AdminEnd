import { Component } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../services/authservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  Registerform :FormGroup
  constructor( private fb:FormBuilder , private service:AuthserviceService) {
this.Registerform = this.fb.group({
    name:['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['',Validators.required]
  });
  }

  registeruser(){
  
  }
}


