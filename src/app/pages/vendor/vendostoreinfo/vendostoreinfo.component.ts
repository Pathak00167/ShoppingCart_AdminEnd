import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VendorService } from '../../../../services/vendor.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendostoreinfo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './vendostoreinfo.component.html',
})
export class VendostoreinfoComponent {
  storeForm: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,private apiService: VendorService,private router: Router) {
    this.storeForm = this.fb.group({
      ownerName: [''],
      storeName: [''],
      storePhoto: [null]
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedFile = file;

      // Update form control
      this.storeForm.patchValue({ storePhoto: file });

      // Generate preview
      const reader = new FileReader();
      reader.onload = e => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
  debugger;
  if (this.storeForm.valid) {
    const formData = new FormData();
    formData.append('ownerName', this.storeForm.get('ownerName')?.value);
    formData.append('storeName', this.storeForm.get('storeName')?.value);

    // Call getUserIdFromToken() to get VendorId (sub)
    const vendorId = this.apiService.getUserIdFromToken();
    if (vendorId) {
      formData.append('vendorId', vendorId);
    } else {
      console.error('VendorId not found in token');
    }

    if (this.selectedFile) {
      formData.append('storePhotograph', this.selectedFile);
    }

    // Now send formData to API
    this.apiService.VendorStoreInfo(formData).subscribe(response => {
      console.log('Upload successful:', response);
      this.router.navigate(['vendor-Address']);
      // Handle success (e.g., navigate to another page or show a success message)
    }, error => {
      console.error('Upload failed:', error);
      // Handle error (e.g., show an error message)
    });

    console.log('Form submitted:', formData);
  } else {
    console.log('Form is invalid');
  }
}


}
