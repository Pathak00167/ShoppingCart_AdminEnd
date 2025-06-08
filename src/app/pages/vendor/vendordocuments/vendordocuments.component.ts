import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorService } from '../../../../services/vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendordocuments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vendordocuments.component.html',
})
export class VendordocumentsComponent implements OnInit {
  documentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const vendorId = this.vendorService.getUserIdFromToken();

    this.documentForm = this.fb.group({
      vendorId: [vendorId, Validators.required],
      gstNumber: [''],
      panNumber: ['', Validators.required],
      businessRegistrationCertificate: [null, Validators.required],
      gstCertificate: [null],
      panCardImage: [null, Validators.required],
    });
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.documentForm.get(controlName)?.setValue(file);
    }
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      const formData = new FormData();

      formData.append('VendorId', this.documentForm.value.vendorId);
      formData.append('GSTNumber', this.documentForm.value.gstNumber);
      formData.append('PANNumber', this.documentForm.value.panNumber);

      formData.append('BusinessRegistrationCertificate', this.documentForm.value.businessRegistrationCertificate);
      if (this.documentForm.value.gstCertificate) {
        formData.append('GSTCertificate', this.documentForm.value.gstCertificate);
      }
      formData.append('PANCardImage', this.documentForm.value.panCardImage);

      this.vendorService.VendorDocuments(formData).subscribe({
        next: (res) => {
          console.log('Documents uploaded successfully', res);
          this.router.navigate(['vendor-AdminApproval']);
        },
        error: (err) => {
          console.error('Upload failed', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
