import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-core-attributes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coreattributes.component.html',
})
export class CoreAttributesComponent implements OnInit {
  subCategoryId: number | null = null;
  coreAttributes: any = [];

  constructor(
    private router: Router,
    private service: AdminService,
    private toastr: ToastrService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { subCategoryId: number };
    this.subCategoryId = state?.subCategoryId ?? null;
  }

  ngOnInit(): void {
    if (this.subCategoryId) {
      this.loadCoreAttributes(this.subCategoryId);
    } else {
      this.toastr.error('Subcategory ID is missing');
      this.router.navigate(['/subcategory']);
    }
  }

  loadCoreAttributes(subId: number) {
    this.service.getCoreAttributes(subId).subscribe({
      next: (data) => {
        this.coreAttributes = data;
      },
      error: (error) => {
        console.error('Error fetching core attributes:', error);
        this.toastr.error('Failed to load core attributes');
      }
    });
  }

  goBack() {
    this.router.navigate(['/subcategory']);
  }
}
