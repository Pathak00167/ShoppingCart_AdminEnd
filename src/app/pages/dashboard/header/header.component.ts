import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() sidebarOpen: boolean = true;
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  userRole: string = 'admin'; // fallback

  ngOnInit(): void {
    const storedRole = sessionStorage.getItem('role');
    this.userRole = storedRole ? storedRole.toLowerCase() : 'admin';
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
}
