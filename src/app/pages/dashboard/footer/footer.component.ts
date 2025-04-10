import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  
  role:string = ''

  constructor() {
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) {
      this.role = storedRole;
    }
  }

}
