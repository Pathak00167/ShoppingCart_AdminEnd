import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../dashboard/header/header.component';
import { SidenavComponent } from '../../dashboard/sidenav/sidenav.component';
import { FooterComponent } from '../../dashboard/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vendordashboard-layout',
  standalone: true,
  imports: [CommonModule,HeaderComponent,SidenavComponent,FooterComponent,RouterOutlet],
  templateUrl: './vendordashboard-layout.component.html',
 
})
export class VendordashboardLayoutComponent {
sidebarOpen = false;
  desktopSidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.desktopSidebarOpen = !this.desktopSidebarOpen;
  }
}
