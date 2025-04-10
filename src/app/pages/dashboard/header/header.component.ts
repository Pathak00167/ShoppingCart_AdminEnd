import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sidebarOpen: boolean = false;
desktopSidebarOpen: boolean = true;

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}

toggleDesktopSidebar() {
  this.desktopSidebarOpen = !this.desktopSidebarOpen;
}

}
