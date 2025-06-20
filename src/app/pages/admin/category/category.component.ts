import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  AddCategory: FormGroup;
  AddSubCategory: FormGroup;
  categories: any = '';
  SubCategories: any = '';
  imageUrl: string = environment.imageUrl;

  showAddCategoryModal = false;
  showAddSubcategoryModal = false;
  showSubcategoryModal = false;

  selectedCategoryImage: File | null = null;
  selectedSubCategoryImage: File | null = null;
  categoryId: number | null = null;

  searchTerm = '';

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private toastrService: ToastrService,
    private router:Router
  ) {
    this.AddCategory = this.fb.group({
      categoryName: ['', [Validators.required]],
      categoryImage: [null, Validators.required],
    });

    this.AddSubCategory = this.fb.group({
      categoryId: [null, Validators.required],
      subCategoryName: ['', Validators.required],
      subCategoryImage: [null, Validators.required],
      coreAttributes: this.fb.array([
        this.createCoreAttribute()
      ])
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  //#region Category Methods
  openAddCategoryModal() {
    this.showAddCategoryModal = true;
  }

  closeAddCategoryModal() {
    this.showAddCategoryModal = false;
    this.AddCategory.reset();
    this.selectedCategoryImage = null;
  }

  submitCategory() {
    const formData = new FormData();
    formData.append('categoryName', this.AddCategory.get('categoryName')?.value);
    formData.append('categoryImage', this.selectedCategoryImage as Blob);

    this.service.addCategory(formData).subscribe({
      next: () => {
        this.closeAddCategoryModal();
        this.toastrService.success('Category added successfully');
        this.loadCategories();
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Failed to add category');
      }
    });
  }
  //#endregion

  //#region SubCategory Methods
  get coreAttributes(): FormArray {
    return this.AddSubCategory.get('coreAttributes') as FormArray;
  }

  createCoreAttribute(): FormGroup {
    return this.fb.group({
      attributeName: ['', Validators.required],
      dataType: ['', Validators.required],
      possibleValues: ['']
    });
  }

  addCoreAttribute() {
    this.coreAttributes.push(this.createCoreAttribute());
  }

  removeCoreAttribute(index: number) {
    this.coreAttributes.removeAt(index);
  }



  openAddSubcategoryModal(categoryId: number) {
    this.categoryId = categoryId;
    this.showAddSubcategoryModal = true;
    this.AddSubCategory.patchValue({ categoryId });
  }

  closeAddSubcategoryModal() {
    this.showAddSubcategoryModal = false;
    this.AddSubCategory.reset();
    this.selectedSubCategoryImage = null;
    this.categoryId = null;
    this.coreAttributes.clear();
    this.addCoreAttribute(); // Re-initialize with one attribute
  }

  submitSubcategory() {
    const formData = new FormData();
    formData.append('categoryId', this.AddSubCategory.get('categoryId')?.value);
    formData.append('subCategoryName', this.AddSubCategory.get('subCategoryName')?.value);
    formData.append('subCategoryImage', this.selectedSubCategoryImage as Blob);

    this.coreAttributes.value.forEach((attr: any, index: number) => {
      formData.append(`CoreAttributes[${index}].AttributeName`, attr.attributeName);
      formData.append(`CoreAttributes[${index}].DataType`, attr.dataType);
      formData.append(`CoreAttributes[${index}].PossibleValues`, attr.possibleValues || '');
    });

    this.service.addSubCategory(formData).subscribe({
      next: () => {
         this.closeAddSubcategoryModal();
          this.loadCategories();
        this.toastrService.success('Subcategory added successfully');
       
       
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Failed to add subcategory');
      }
    });
  }
  //#endregion

  //#region Shared Methods
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedCategoryImage = file;
      this.selectedSubCategoryImage = file;

      this.AddSubCategory.patchValue({ subCategoryImage: file });
      this.AddSubCategory.get('subCategoryImage')?.updateValueAndValidity();

      this.AddCategory.patchValue({ categoryImage: file });
      this.AddCategory.get('categoryImage')?.updateValueAndValidity();
    }
  }

  loadCategories() {
    this.service.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.toastrService.error('Failed to load categories');
      }
    });
  }

  loadSubCategories(id: number) {debugger
    this.service.getSubCategories(id).subscribe({
      next: (data) => {
        this.SubCategories = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching subcategories:', error);
        this.toastrService.error('Failed to load subcategories');
      }
    });
  }

  GetSubCategory(categoryId: number) {
     this.router.navigate(['/subcategory-details'], {
    state: { categoryId }
  });
  }

  closeModal() {
    this.showSubcategoryModal = false;
  }

  getCategoryNameById(id: number | null): string {
    if (id === null) return '';
    const category = this.categories.find((cat: any) => cat.categoryId === id);
    return category ? category.categoryName : '';
  }

newAttribute = {
  name: '',
  type: '',
  optionsString: ''
};

addAttribute(sub: any) {
  if (!this.newAttribute.name || !this.newAttribute.type) return;

  const attr = {
    name: this.newAttribute.name,
    type: this.newAttribute.type,
    options: this.newAttribute.type === 'Dropdown'
      ? this.newAttribute.optionsString.split(',').map(x => x.trim())
      : []
  };

  if (!sub.coreAttributes) sub.coreAttributes = [];
  sub.coreAttributes.push(attr);

  // Reset form
  this.newAttribute = { name: '', type: '', optionsString: '' };
}

removeAttribute(sub: any, index: number) {
  sub.coreAttributes.splice(index, 1);
}

saveSubcategoryAttributes() {
  // this.service.updateSubcategoryAttributes(this.SubCategories).subscribe({
  //   next: () => this.toastrService.success('Changes saved!'),
  //   error: () => this.toastrService.error('Error saving changes'),
  // });
}

  //#endregion
}
