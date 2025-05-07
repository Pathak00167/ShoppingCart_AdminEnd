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
})
export class CategoryComponent {

  AddCategory:FormGroup;
  AddSubCategory:FormGroup;
  categories:any="";
  SubCategories:any="";
  imageUrl:string=environment.imageUrl
  showAddCategoryModal = false;
selectedCategoryImage: File | null = null;
selectedSubCategoryImage:File| null =null;
showAddSubcategoryModal = false;
categoryId: number | null = null;
constructor(private fb:FormBuilder,private service:AdminService,private toastrService:ToastrService)
{
  this.AddCategory = this.fb.group({
    categoryName: ['', [Validators.required, Validators.email]],
    categoryIamge: [null,[ Validators.required,]],
   });

   this.AddSubCategory = this.fb.group({
    categoryId: [null, [Validators.required]],
    subCategoryName:['',[Validators.required, Validators.email]],
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

loadSubCategories(id:Number) {debugger
  this.service.getSubCategories(id).subscribe({
    next: (data) => {
      this.SubCategories = data;
      console.log("SubCategories loaded:", data);
    },
    error: (error) => {
      console.error('Error fetching categories:', error);
      this.toastrService.error('Failed to load categories');
    }
  });
}

searchTerm = '';
showSubcategoryModal = false;

openModal(categoryId: number) {debugger
  this.loadSubCategories(categoryId);
  this.showSubcategoryModal = true;
}

closeModal() {
  this.showSubcategoryModal = false;
}

filteredSubcategories() {
  // return this.submitCategory.filter(sub =>
  //   sub.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  // );
}


getCategoryNameById(id: number | null): string {
  if (id === null) {
    return '';
  }
  const category = this.categories.find((cat: any) => cat.categoryId === id);
  return category ? category.categoryName : '';
}





openAddSubcategoryModal(categoryId: number) {debugger
  this.categoryId = categoryId;
  this.showAddSubcategoryModal = true;
  this.AddSubCategory.patchValue({ categoryId: categoryId });
}


closeAddSubcategoryModal() {
  this.showAddSubcategoryModal = false;
  this.AddSubCategory.reset();
    this.selectedCategoryImage = null;
  this.selectedCategoryImage = null;
  this.categoryId = null;
}

submitSubcategory() {debugger
  const formData = new FormData();
  formData.append('categoryId', this.AddSubCategory.get('categoryId')?.value);
  formData.append('subCategoryName', this.AddSubCategory.get('subCategoryName')?.value);
  formData.append('subCategoryImage', this.selectedSubCategoryImage as Blob);

  // Replace with your API service
  this.service.addSubCategory(formData).subscribe({
    next: (res) => {
      this.toastrService.success('Category added successfully');
      this.closeAddSubcategoryModal();
      
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

  
 
  onImageSelected(event: any) {debugger
    const file = event.target.files[0];
    if (file) {
      this.selectedCategoryImage = file;
      this.selectedSubCategoryImage=file
  
      // Ensure the control name matches exactly
      this.AddSubCategory.patchValue({ subCategoryImage: file });
      this.AddSubCategory.get('subCategoryImage')?.updateValueAndValidity();
  
      this.AddCategory.patchValue({ categoryImage: file });
      this.AddCategory.get('categoryImage')?.updateValueAndValidity();
    }
  }
  
  submitCategory() {debugger
    
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
  


