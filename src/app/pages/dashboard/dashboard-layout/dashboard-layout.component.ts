import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { FooterComponent } from '../footer/footer.component'; 
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule,HeaderComponent,SidenavComponent,FooterComponent,RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  sidebarOpen = false;
  desktopSidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.desktopSidebarOpen = !this.desktopSidebarOpen;
  }
}
