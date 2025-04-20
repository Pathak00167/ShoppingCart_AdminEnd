import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories:any="";
  imageUrl:string=environment.imageUrl
constructor(private service:AdminService,private toastrService:ToastrService)
{
}
ngOnInit(): void {debugger
  
  
    this.service.getCategories().subscribe({
     next: (data) => {
       this.categories = data;
       console.log("Chat section data is ",data)
     },
     error: (error) => {
       console.error('Error fetching users Friends:', error);
       this.toastrService.error('Failed to load random users');
     }
    })
}
}
