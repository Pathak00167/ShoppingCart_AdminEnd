import { RegisterComponent } from './pages/authentication/register/register.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { AdminInstructionComponent } from './pages/admin/instructions/admin-instruction/admin-instruction.component';
import { VendorInstructionsComponent } from './pages/vendor/vendor-instructions/vendor-instructions.component';
import { ForgetPasswordComponent } from './pages/authentication/forget-password/forget-password.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'registeruser', component: RegisterComponent },
  {path: 'instruction', component: AdminInstructionComponent},  
  {path: 'instructions', component: VendorInstructionsComponent},   
  {path: 'forget-password', component: ForgetPasswordComponent},

  
];
