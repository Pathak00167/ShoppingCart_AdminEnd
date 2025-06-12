import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './vendors.component.html',
})
export class VendorsComponent  implements OnInit {
vendors: any[] = [];

  
  // Static data for now
 

  constructor(private service :AdminService) {}

  ngOnInit(): void {
    this.getVendors()
  }

     getVendors() {
    this.service.getVendors().subscribe({
      next: (data) => {
        console.log(data)
        console.log(data.vendors);

        this.vendors = data.vendors.vendors; // ✅ now this.vendors is an array
      },
      error: (error) => {
        console.error('Error fetching vendors:', error);
      }
    });
  }
}