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

export const routes: Routes = [
  
  // Public routes
  
  {path: '',component:LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registeruser', component: RegisterComponent },
  {path: 'instruction', component: AdminInstructionComponent,canActivate:[admingaurdGuard]},  
  {path: 'instructions', component: VendorInstructionsComponent, canActivate:[vendorgaurdGuard]},   
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'header', component:HeaderComponent,canActivate:[vendorgaurdGuard]},
  { 
    path: '', 
    component: DashboardLayoutComponent, 
    canActivate: [admingaurdGuard],  // Protect the dashboard routes
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'vendors', component: VendorsComponent },
      { path: 'users', component: UsersComponent },
    ]
  },

];
