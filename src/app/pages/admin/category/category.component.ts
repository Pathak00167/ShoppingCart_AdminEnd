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
  AddSubCategory:FormGroup;
  categories:any="";
  imageUrl:string=environment.imageUrl
  showAddCategoryModal = false;
selectedCategoryImage: File | null = null;
selectedSubCategoryImage:File| null =null;
constructor(private fb:FormBuilder,private service:AdminService,private toastrService:ToastrService)
{
  this.AddCategory = this.fb.group({
    categoryName: ['', [Validators.required, Validators.email]],
    categoryIamge: [null,[ Validators.required,]],
   });

   this.AddSubCategory = this.fb.group({
    subCategoryName:['',[Validators.required]],
    subCategoryImage:[null,[Validators.required]]
   });
}
ngOnInit(): void {
  this.loadCategories();
}

loadCategories() {debugger
  this.service.getCategories().subscribe({
    next: (data) => {
      this.categories = data;
      console.log("Categories loaded:", data);
    },
    error: (error) => {
      console.error('Error fetching categories:', error);
      this.toastrService.error('Failed to load categories');
    }
  });
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
subcategoryImage: File | null = null;

openAddSubcategoryModal(categoryId: number) {
  this.selectedCategoryId = categoryId;
  this.showAddSubcategoryModal = true;
}

closeAddSubcategoryModal() {
  this.showAddSubcategoryModal = false;
  this.AddSubCategory.reset();
    this.selectedCategoryImage = null;
  this.subcategoryImage = null;
  this.selectedCategoryId = null;
}

onSubcategoryImageSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.subcategoryImage = file;
  }
}

submitSubcategory() {debugger
  const formData = new FormData();
  formData.append('subcategoryName', this.AddSubCategory.get('subcategoryName')?.value);
  formData.append('subCategoryImage', this.selectedSubCategoryImage as Blob);

  // Replace with your API service
  this.service.addCategory(formData).subscribe({
    next: (res) => {
      this.closeAddCategoryModal();
      this.toastrService.success('Category added successfully');
      this.loadCategories(); // reload categories
    },
    error: (err) => {
      console.error(err);
      this.toastrService.error('Failed to add category');
    }
  });


}



  //#region   
  openAddCategoryModal() {
    this.showAddCategoryModal = true;
  }
  
  closeAddCategoryModal() {
    this.showAddCategoryModal = false;
    this.AddCategory.reset();
    this.selectedCategoryImage = null;
  }

  
 
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedCategoryImage = file;
      this.subcategoryImage = file;
  
      // Ensure the control name matches exactly
      this.AddSubCategory.patchValue({ subCategoryImage: file });
      this.AddSubCategory.get('subCategoryImage')?.updateValueAndValidity();
  
      this.AddCategory.patchValue({ categoryImage: file });
      this.AddCategory.get('categoryImage')?.updateValueAndValidity();
    }
  }
  
  submitCategory() {
    
      const formData = new FormData();
      formData.append('categoryName', this.AddCategory.get('categoryName')?.value);
      formData.append('categoryImage', this.selectedCategoryImage as Blob);

      // Replace with your API service
      this.service.addCategory(formData).subscribe({
        next: (res) => {
          this.closeAddCategoryModal();
          this.toastrService.success('Category added successfully');
          this.loadCategories(); // reload categories
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Failed to add category');
        }
      });
    
  }
  //#endregion
}
  


