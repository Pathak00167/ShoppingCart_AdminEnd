import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { selectSelectedCategoryId } from '../../../state/app.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-core-attributes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coreattributes.component.html',
})
export class CoreAttributesComponent implements OnInit, OnDestroy {
  subCategoryId: number | null = null;
  coreAttributes: any = [];
  private sub$: Subscription | undefined;

  constructor(
    private router: Router,
    private service: AdminService,
    private toastr: ToastrService,
    private store: Store<{ app: AppState }>
  ) {}

  ngOnInit(): void {
    this.sub$ = this.store.select(selectSelectedCategoryId).subscribe((id) => {
      this.subCategoryId = id;

      if (id !== null) {
        this.loadCoreAttributes(id);
      } else {
        this.toastr.error('Subcategory ID is missing');
        this.router.navigate(['/subcategory']);
      }
    });
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
    this.router.navigate(['/subcategory-details']);
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }
}
