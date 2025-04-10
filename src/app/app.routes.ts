import { RegisterComponent } from './pages/authentication/register/register.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { AdminInstructionComponent } from './pages/admin/instructions/admin-instruction/admin-instruction.component';
import { VendorInstructionsComponent } from './pages/vendor/vendor-instructions/vendor-instructions.component';
import { ForgetPasswordComponent } from './pages/authentication/forget-password/forget-password.component';
import { HeaderComponent } from './pages/dashboard/header/header.component';
import { vendorgaurdGuard } from './gaurds/vendorgaurd.guard';
import { admingaurdGuard } from './gaurds/admingaurd.guard';
import { FooterComponent } from './pages/dashboard/footer/footer.component';

export const routes: Routes = [
  
  // Public routes
  
  {path: '',component:LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registeruser', component: RegisterComponent },
  {path: 'instruction', component: AdminInstructionComponent,canActivate:[admingaurdGuard]},  
  {path: 'instructions', component: VendorInstructionsComponent, canActivate:[vendorgaurdGuard]},   
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'header', component:HeaderComponent,canActivate:[vendorgaurdGuard]},
  { path: 'admin-dashboard', component: FooterComponent },
  
];
