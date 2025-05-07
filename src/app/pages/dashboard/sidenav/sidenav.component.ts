import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input,Output,EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  @Input() sidebarOpen: boolean = true;
  @Input() mobileSidebarOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();
}
