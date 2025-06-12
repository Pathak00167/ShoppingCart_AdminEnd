import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';
import { signal } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }
  
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/Category`)
  }

  getSubCategories(categoryId :Number): Observable<any> {debugger
    return this.http.get<any>(`${this.apiUrl}/Admin/SubCategory/${categoryId}`) 
  }

  addCategory(categoryData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Admin/Category`, categoryData).pipe(
      tap((response) => {
        console.log('Category added:', response);
      })
    );
  }

  addSubCategory(subCategoryData: FormData): Observable<any> {debugger
    return this.http.post<any>(`${this.apiUrl}/Admin/SubCategory`, subCategoryData).pipe(
      tap((response) => {
        console.log('Subcategory added:', response);
      })
    );
  }

 getVendors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/Vendor`)
  }

  
}
