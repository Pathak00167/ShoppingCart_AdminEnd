import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Input() sidebarOpen: boolean = true;
  @Input() mobileSidebarOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();
}
