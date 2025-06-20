import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../services/admin.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcategory.component.html',
 
})
export class SubcategoryComponent {
  categoryId: number | null = null;
SubCategories: any = '';
 imageUrl: string = environment.imageUrl;

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private toastrService: ToastrService,
    private router:Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { categoryId: number };
    this.categoryId = state?.categoryId ?? null;
  }
  

  ngOnInit(): void {
       if(this.categoryId !=null)
       {
            this.loadSubCategories(this.categoryId)
       }
  
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
}
