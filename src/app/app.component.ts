import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./pages/loader/loader/loader.component";
import { LoaderService } from '../services/loader.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoading$: Observable<boolean>;
  constructor( private loaderService: LoaderService,) {
    this.isLoading$ = this.loaderService.isLoading$;
   } 
}
