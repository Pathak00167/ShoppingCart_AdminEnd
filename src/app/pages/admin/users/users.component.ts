import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  
  // Static data for now
  users = [
    { id: 'U001', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: 'U002', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Inactive' },
    { id: 'U003', name: 'Sam Johnson', email: 'sam.johnson@example.com', role: 'User', status: 'Active' },
    { id: 'U004', name: 'Emily Davis', email: 'emily.davis@example.com', role: 'Admin', status: 'Inactive' }
  ];

  constructor() {}

  ngOnInit(): void {
    // In the future, you'll call a service to fetch users from an API
  }

  // Functions for Activate/Deactivate (currently static)
  activateUser(userId: string) {
    // Simulate activating the user (change status to 'Active')
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = 'Active';
    }
  }

  deactivateUser(userId: string) {
    // Simulate deactivating the user (change status to 'Inactive')
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = 'Inactive';
    }
  }
}
