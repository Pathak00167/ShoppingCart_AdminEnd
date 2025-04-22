import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { customInterceptor } from './custom.interceptor';
import { LoaderService } from '../services/loader.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideToastr(),
    provideHttpClient(withInterceptors([customInterceptor])),
  ] 
};
