import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories:any="";
  imageUrl:string=environment.imageUrl
  showAddCategoryModal = false;
newCategoryName = '';
selectedCategoryImage: File | null = null;
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
subcategoryList = [
  { name: 'Laptops' },
  { name: 'Smartphones' },
  { name: 'Headphones' },
  { name: 'Watches' },
  { name: 'Chargers' },
  { name: 'Accessories' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
  { name: 'Gaming Consoles' },
];

searchTerm = '';
showSubcategoryModal = false;

openModal() {
  this.showSubcategoryModal = true;
}

closeModal() {
  this.showSubcategoryModal = false;
}

filteredSubcategories() {
  return this.subcategoryList.filter(sub =>
    sub.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}


  //#region   
  openAddCategoryModal() {
    this.showAddCategoryModal = true;
  }
  
  closeAddCategoryModal() {
    this.showAddCategoryModal = false;
    this.newCategoryName = '';
    this.selectedCategoryImage = null;
  }
  
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedCategoryImage = file;
    }
  }
  
  submitCategory() {
    if (this.newCategoryName && this.selectedCategoryImage) {
      // Mock logic - replace with your API call
      console.log('Category Name:', this.newCategoryName);
      console.log('Selected Image:', this.selectedCategoryImage.name);
  
      // Close modal and reset
      this.closeAddCategoryModal();
    }
  }
  //#endregion

}
