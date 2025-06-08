import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnInit {
  @Input() sidebarOpen: boolean = true;
  @Input() mobileSidebarOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  userRole: string = 'admin'; // default fallback

  ngOnInit(): void {
    const storedRole = sessionStorage.getItem('role');
    this.userRole = storedRole ? storedRole.toLowerCase() : 'admin';
  }
}
