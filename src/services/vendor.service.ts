import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';
import { signal } from '@angular/core'; // Import signal from Angular core
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode library

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = environment.apiUrl; 
  private userInfo = signal<any[]>([]); 
  constructor(private http:HttpClient) { }

  
  VendorStoreInfo(vendorData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Vendor/VendorStoreInfo`, vendorData).pipe(
      tap((response) => {
        console.log('Category added:', response);
      })
    );
  }

  getUserIdFromToken(): string  {
  const token = sessionStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);
    return decodedToken.sub;  
  }
  return "";
}

  
}

