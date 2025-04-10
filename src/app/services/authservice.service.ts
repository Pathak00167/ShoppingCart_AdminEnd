import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { signal } from '@angular/core'; // Import signal from Angular core

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = environment.apiUrl; 
  private userInfo = signal<any[]>([]); 
  constructor(private http:HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/login`, credentials)
  }
}

