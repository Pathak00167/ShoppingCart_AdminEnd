import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { setSelectedId } from '../../../state/app.actions';
import { Subscription } from 'rxjs';
import { selectSelectedCategoryId } from '../../../state/app.selector';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './subcategory.component.html',
})
export class SubcategoryComponent implements OnInit {
  categoryId: number | null = null;
  SubCategories: any[] = [];
  imageUrl: string = environment.imageUrl;

  AddSubCategory!: FormGroup;
  coreAttributes!: FormArray;
  selectedSubCategoryImage: File | null = null;
  searchTerm = '';
  showSubcategoryModal = false;
  imagePreviewUrl: string | null = null;
  private sub$: Subscription | undefined;


  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private toastrService: ToastrService,
    private router: Router,
      private store: Store<{ app: AppState }>
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { categoryId: number };
    this.categoryId = state?.categoryId ?? null;
  }

  ngOnInit(): void {
this.sub$ = this.store.select(selectSelectedCategoryId).subscribe((id) => {
      this.categoryId = id;
})
    if (this.categoryId !== null) {
      this.loadSubCategories(this.categoryId);
    }

    this.coreAttributes = this.fb.array([
      this.createAttributeFormGroup()
    ]);

    this.AddSubCategory = this.fb.group({
      subCategoryName: ['', Validators.required],
      subCategoryImage: [null],
      coreAttributes: this.coreAttributes
    });
  }

  get coreAttributesControls() {
    return this.coreAttributes.controls as FormGroup[];
  }

  createAttributeFormGroup(): FormGroup {
    return this.fb.group({
      attributeName: ['', Validators.required],
      dataType: ['Text', Validators.required],
      possibleValues: ['']
    });
  }

  addCoreAttribute() {
    this.coreAttributes.push(this.createAttributeFormGroup());
  }

  removeCoreAttribute(index: number) {
    if (this.coreAttributes.length > 1) {
      this.coreAttributes.removeAt(index);
    } else {
      this.toastrService.warning('At least one attribute is required.');
    }
  }

  loadSubCategories(id: number) {
    this.service.getSubCategories(id).subscribe({
      next: (data) => {
        this.SubCategories = data;
      },
      error: (error) => {
        console.error('Error fetching subcategories:', error);
        this.toastrService.error('Failed to load subcategories');
      }
    });
  }

  openAddSubcategoryModal() {
    this.showSubcategoryModal = true;
  }

  closeAddSubcategoryModal() {
    this.showSubcategoryModal = false;
  }

 onFileChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedSubCategoryImage = file;

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

GetSubCategory(subCategoryId: number) {
  this.store.dispatch(setSelectedId({ id: subCategoryId }));
     this.router.navigate(['/core-attributes'], {
    // state: { subCategoryId }
  });
  }

  submitSubcategory() {
    if (!this.categoryId) {
      this.toastrService.error('Category ID missing');
      return;
    }

    const formData = new FormData();
    formData.append('categoryId', this.categoryId.toString());
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
        this.loadSubCategories(this.categoryId!);
        this.toastrService.success('Subcategory added successfully');
        this.AddSubCategory.reset();
        this.coreAttributes.clear();
        this.coreAttributes.push(this.createAttributeFormGroup());
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Failed to add subcategory');
      }
    });
  }
  goBackToCategories() {
    this.router.navigate(['/category']);
  }
}
