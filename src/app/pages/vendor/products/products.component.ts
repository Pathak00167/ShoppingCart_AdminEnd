import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import namer from 'color-namer';
import { VendorService } from '../../../../services/vendor.service';
import { AdminService } from '../../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
   products = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    category: 'Electronics',
    price: 25999,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'High-performance smartphone with long-lasting battery.'
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    category: 'Accessories',
    price: 4999,
    image: 'https://via.placeholder.com/150',
    inStock: false,
    description: 'Crystal clear sound with noise cancellation.'
  },
  {
    id: 3,
    name: 'Gaming Laptop',
    category: 'Computers',
    price: 79999,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Powerful laptop for high-end gaming and productivity.'
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    category: 'Audio',
    price: 1999,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Portable speaker with deep bass and long battery life.'
  },
  {
    id: 5,
    name: 'Smartwatch Pro',
    category: 'Wearables',
    price: 9999,
    image: 'https://via.placeholder.com/150',
    inStock: false,
    description: 'Track your fitness and get notifications on your wrist.'
  },
  {
    id: 6,
    name: 'DSLR Camera',
    category: 'Photography',
    price: 44999,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Capture stunning photos with advanced DSLR features.'
  },
  {
    id: 7,
    name: 'Electric Kettle',
    category: 'Home Appliances',
    price: 1299,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Quickly boil water with auto shut-off safety feature.'
  },
  {
    id: 8,
    name: 'LED Monitor 24"',
    category: 'Computers',
    price: 10999,
    image: 'https://via.placeholder.com/150',
    inStock: false,
    description: 'Full HD LED monitor with ultra-slim design.'
  },
  {
    id: 9,
    name: 'Wireless Keyboard & Mouse',
    category: 'Accessories',
    price: 2299,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Compact combo for comfortable typing and control.'
  },
  {
    id: 10,
    name: 'Fitness Band',
    category: 'Wearables',
    price: 1499,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Track your steps, sleep, and heart rate throughout the day.'
  }
]; 

  subcategories: any = '';
  categories: any = [];
  selectedProduct: any = null;
  showAddProductModal = false;
  thumbnailPreview: string | ArrayBuffer | null = null;
  currentStep: number = 1;

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private toastrService: ToastrService,
    private vendorService: VendorService
  ) {
    this.productForm = this.fb.group({
      CategoryId: [null, Validators.required],
      subCategoryId: [null, Validators.required],
      vendorId: [null],
      brand: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      thumbnailImage: [null, Validators.required],
      variants: this.fb.array([this.createVariantFormGroup()])
    });
    this.loadCategories();
  }

  // Stepper Navigation
  nextStep() {
    if (this.currentStep === 1 && !this.isStepValid(1)) {
      this.markBasicInfoAsTouched();
      return;
    }
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        const subCategoryValid = this.productForm.get('subCategoryId')?.valid ?? false;
        const brandValid = this.productForm.get('brand')?.valid ?? false;
        const productNameValid = this.productForm.get('productName')?.valid ?? false;
        const descriptionValid = this.productForm.get('description')?.valid ?? false;
        const thumbnailValid = this.productForm.get('thumbnailImage')?.valid ?? false;
        
        return subCategoryValid && brandValid && productNameValid && descriptionValid && thumbnailValid;
      case 2:
        return this.variants.valid;
      default:
        return true;
    }
  }

  // Category and Subcategory Loading
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

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = Number(selectElement.value);
    if (categoryId) {
      this.loadsubcategories(categoryId);
    }
  }

  loadsubcategories(id: number) {
    this.service.getSubCategories(id).subscribe({
      next: (data) => {
        this.subcategories = data;
      },
      error: (error) => {
        console.error('Error fetching subcategories:', error);
        this.toastrService.error('Failed to load subcategories');
      }
    });
  }

  // Form group setup
  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  createVariantFormGroup(): FormGroup {
    return this.fb.group({
      colorName: ['', Validators.required],
      colorHex: ['#000000'],
      price: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      variantImages: this.fb.array([]),
      coreAttributeValues: this.fb.array([])
    });
  }

  addVariant() {
    this.variants.push(this.createVariantFormGroup());
  }

  removeVariant(index: number) {
    this.variants.removeAt(index);
  }

  // Variant image helpers
  getVariantImages(variantIndex: number): FormArray {
    return this.variants.at(variantIndex).get('variantImages') as FormArray;
  }

  addVariantImage(variantIndex: number, file: File) {
    const images = this.getVariantImages(variantIndex);
    images.push(this.fb.group({
      imageUrl: [file],
      displayOrder: [images.length]
    }));
  }

  // Core attribute helpers
  getCoreAttributes(variantIndex: number): FormArray {
    return this.variants.at(variantIndex).get('coreAttributeValues') as FormArray;
  }

  createCoreAttributeFormGroup(): FormGroup {
    return this.fb.group({
      coreAttributeId: [null, Validators.required],
      value: ['', Validators.required]
    });
  }

  addCoreAttribute(variantIndex: number) {
    this.getCoreAttributes(variantIndex).push(this.createCoreAttributeFormGroup());
  }

  removeCoreAttribute(variantIndex: number, attrIndex: number) {
    this.getCoreAttributes(variantIndex).removeAt(attrIndex);
  }

  // File handling
  onFileSelected(event: any, type: 'thumbnail' | 'variantImage', variantIndex?: number) {
    const file = event.target.files[0];
    if (!file) return;

    if (type === 'thumbnail') {
      this.productForm.patchValue({ thumbnailImage: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else if (type === 'variantImage' && variantIndex !== undefined) {
      this.addVariantImage(variantIndex, file);
    }
  }

  removeThumbnail() {
    this.thumbnailPreview = null;
    this.productForm.patchValue({ thumbnailImage: null });
    
    // Clear the file input value
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  removeVariantImage(variantIndex: number, imgIndex: number) {
    const images = this.getVariantImages(variantIndex);
    images.removeAt(imgIndex);
  }

  getImagePreview(file: File): string | ArrayBuffer {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return '';
  }

  // Color handling
  getColorNameFromHex(hex: string): string {
    try {
      const cleanHex = hex.startsWith('#') ? hex.substring(1) : hex;
      const names = namer(`#${cleanHex}`);
      return names.ntc[0]?.name || `Custom Color (${hex})`;
    } catch (err) {
      console.error('Color naming failed:', err);
      return `Custom Color (${hex})`;
    }
  }

  onColorChange(hexValue: string, variantIndex: number): void {
    if (!hexValue) return;
    
    const colorName = this.getColorNameFromHex(hexValue);
    const variantGroup = this.variants.at(variantIndex) as FormGroup;
    
    if (variantGroup) {
      variantGroup.get('colorName')?.setValue(colorName);
      variantGroup.get('colorHex')?.setValue(hexValue);
    }
  }

  // Product modal
  openProductDetails(product: any) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }

  openAddProductModal() {
    this.showAddProductModal = true;
    this.currentStep = 1;
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
    this.resetProductForm();
    this.currentStep = 1;
  }

  submitProduct() {
    if (this.productForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;
    const formData = this.prepareFormData(formValue);

    console.log('Submitting product:', formData);
    this.closeAddProductModal();
  }

  private prepareFormData(formValue: any): FormData {
    const formData = new FormData();

    Object.keys(formValue).forEach(key => {
      if (key !== 'variants' && key !== 'thumbnailImage') {
        formData.append(key, formValue[key]);
      }
    });

    if (formValue.thumbnailImage) {
      formData.append('thumbnailImage', formValue.thumbnailImage);
    }

    formValue.variants.forEach((variant: any, index: number) => {
      Object.keys(variant).forEach(key => {
        if (key === 'variantImages') {
          variant.variantImages.forEach((image: any, imgIndex: number) => {
            formData.append(`variants[${index}].variantImages[${imgIndex}]`, image.imageUrl);
          });
        } else if (key === 'coreAttributeValues') {
          variant.coreAttributeValues.forEach((attr: any, attrIndex: number) => {
            formData.append(`variants[${index}].coreAttributeValues[${attrIndex}].coreAttributeId`, attr.coreAttributeId);
            formData.append(`variants[${index}].coreAttributeValues[${attrIndex}].value`, attr.value);
          });
        } else {
          formData.append(`variants[${index}].${key}`, variant[key]);
        }
      });
    });

    return formData;
  }

  private markBasicInfoAsTouched() {
    this.productForm.get('CategoryId')?.markAsTouched();
    this.productForm.get('subCategoryId')?.markAsTouched();
    this.productForm.get('brand')?.markAsTouched();
    this.productForm.get('productName')?.markAsTouched();
    this.productForm.get('description')?.markAsTouched();
    this.productForm.get('thumbnailImage')?.markAsTouched();
  }

  private markAllAsTouched() {
    Object.values(this.productForm.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            Object.values(arrayControl.controls).forEach(nestedControl => {
              nestedControl.markAsTouched();
            });
          }
        });
      }
    });
  }

  private resetProductForm() {
    this.thumbnailPreview = null;
    this.productForm.reset({
      CategoryId: null,
      subCategoryId: null,
      vendorId: null,
      brand: '',
      productName: '',
      description: '',
      thumbnailImage: null,
      variants: this.fb.array([this.createVariantFormGroup()])
    });
  }

  // Helper methods for review step
  getCategoryName(id: number): string {
    const category = this.categories.find((c: any) => c.id === id);
    return category ? category.name : 'Not selected';
  }

  getSubcategoryName(id: number): string {
    const subcategory = this.subcategories.find((s: any) => s.id === id);
    return subcategory ? subcategory.name : 'Not selected';
  }

  getAttributeName(id: number): string {
    const attributes = [
      { id: 1, name: 'Size' },
      { id: 2, name: 'Storage' },
      { id: 3, name: 'Weight' },
      { id: 4, name: 'Dimensions' },
      { id: 5, name: 'Material' },
      { id: 6, name: 'Battery' }
    ];
    const attr = attributes.find(a => a.id === id);
    return attr ? attr.name : 'Unknown';
  }
}