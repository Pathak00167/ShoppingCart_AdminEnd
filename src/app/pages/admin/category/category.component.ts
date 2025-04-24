import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  AddCategory:FormGroup;
  categories:any="";
  imageUrl:string=environment.imageUrl
  showAddCategoryModal = false;
newCategoryName = '';
selectedCategoryImage: File | null = null;
constructor(private fb:FormBuilder,private service:AdminService,private toastrService:ToastrService)
{
  this.AddCategory = this.fb.group({
    categoryName: ['', [Validators.required, Validators.email]],
    categoryIamge: [null,[ Validators.required]],
   });
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


showAddSubcategoryModal = false;
selectedCategoryId: number | null = null;
subcategoryName = '';
subcategoryImage: File | null = null;

openAddSubcategoryModal(categoryId: number) {
  this.selectedCategoryId = categoryId;
  this.showAddSubcategoryModal = true;
}

closeAddSubcategoryModal() {
  this.showAddSubcategoryModal = false;
  this.subcategoryName = '';
  this.subcategoryImage = null;
  this.selectedCategoryId = null;
}

onSubcategoryImageSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.subcategoryImage = file;
  }
}

submitSubcategory() {
  if (this.selectedCategoryId && this.subcategoryName && this.subcategoryImage) {
    // Replace with API logic
    console.log('Category ID:', this.selectedCategoryId);
    console.log('Subcategory Name:', this.subcategoryName);
    console.log('Image:', this.subcategoryImage.name);

    this.closeAddSubcategoryModal();
  }
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
