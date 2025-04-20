import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core'; 

export const admingaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  var findRole=sessionStorage.getItem("role")
  if(findRole == "Admin")
  {
    return true;
  }
 router.navigate(['/login'])
  return false;
};
