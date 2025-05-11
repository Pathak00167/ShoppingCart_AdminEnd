import { CategoryComponent } from './pages/admin/category/category.component';
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
import { DashboardLayoutComponent } from './pages/dashboard/dashboard-layout/dashboard-layout.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { VendorsComponent } from './pages/admin/vendors/vendors.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { EmailverificationComponent } from './pages/authentication/emailverification/emailverification.component';
import { verificationgaurdGuard } from './gaurds/verificationgaurd.guard';
import { VendostoreinfoComponent } from './pages/vendor/vendostoreinfo/vendostoreinfo.component';
import { VendoraddressComponent } from './pages/vendor/vendoraddress/vendoraddress.component';

export const routes: Routes = [
  
  // Public routes
  
  {path: '',component:LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registeruser', component: RegisterComponent },
  {path: 'instruction', component: AdminInstructionComponent,canActivate:[admingaurdGuard]},  
  {path: 'instructions', component: VendorInstructionsComponent, canActivate:[vendorgaurdGuard]},   
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'header', component:HeaderComponent,canActivate:[vendorgaurdGuard]},
  {path: 'otp-verification', component:EmailverificationComponent,canActivate:[verificationgaurdGuard]},
  {path: 'vendor-verification', component:VendostoreinfoComponent,canActivate:[verificationgaurdGuard]},
    {path: 'vendor-Address', component:VendoraddressComponent,canActivate:[verificationgaurdGuard]},

  { 
    path: '', 
    component: DashboardLayoutComponent, 
    canActivate: [admingaurdGuard],  // Protect the dashboard routes
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent ,canActivateChild:[admingaurdGuard]},
      { path: 'category', component: CategoryComponent,canActivateChild:[admingaurdGuard] },
      { path: 'vendors', component: VendorsComponent,canActivateChild:[admingaurdGuard] },
      { path: 'users', component: UsersComponent,canActivateChild:[admingaurdGuard] },
    ]
  },

];
