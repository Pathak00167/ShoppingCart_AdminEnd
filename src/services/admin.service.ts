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
}
