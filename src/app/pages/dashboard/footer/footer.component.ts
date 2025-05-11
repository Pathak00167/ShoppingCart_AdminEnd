import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  sidebarOpen: boolean = false;
desktopSidebarOpen: boolean = true;

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}

toggleDesktopSidebar() {
  this.desktopSidebarOpen = !this.desktopSidebarOpen;
}

}
