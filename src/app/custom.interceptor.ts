import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core'; // For dependency injection in functional interceptors
import { LoaderService } from '../services/loader.service'; 
import { finalize } from 'rxjs/operators';

export const customInterceptor: HttpInterceptorFn = (req, next) => {debugger

  const loaderService = inject(LoaderService);
  
  loaderService.show();

 
  const mytoken =sessionStorage.getItem('token');
  const cloneRequest=req.clone({
    setHeaders:{
   Authorization: `Bearer ${mytoken}` 
    }
  })
 return next(cloneRequest).pipe(
    finalize(() => loaderService.hide()) 
  );
};
