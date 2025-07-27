import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ✅ Import color-namer
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

subcategories:any = '';
categories: any = [];
  selectedProduct: any = null;
  showAddProductModal = false;

  productForm: FormGroup;

  constructor(private fb: FormBuilder,private service:AdminService, private toastrService: ToastrService, private vendorService: VendorService) {
    this.productForm = this.fb.group({
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

  loadsubcategories(id: number) {
     this.service.getSubCategories(id).subscribe({
      next: (data) => {
        this.subcategories = data;
        console.log(data);
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
    } else if (type === 'variantImage' && variantIndex !== undefined) {
      this.addVariantImage(variantIndex, file);
    }
  }



   // Add this method to get color name from hex
  getColorNameFromHex(hex: string): string {
    try {
      // Remove # if present
      const cleanHex = hex.startsWith('#') ? hex.substring(1) : hex;
      
      // Get color names
      const names = namer(`#${cleanHex}`);
      
      // Return the most probable name (from ntc names)
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
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
    this.resetProductForm();
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
    this.productForm.reset({
      subCategoryId: null,
      vendorId: null,
      brand: '',
      productName: '',
      description: '',
      thumbnailImage: null,
      variants: this.fb.array([this.createVariantFormGroup()])
    });
  }
}
