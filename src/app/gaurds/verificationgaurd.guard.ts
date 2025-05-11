import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const verificationgaurdGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
   var findState = sessionStorage.getItem("VendorState")
 if(findState == "Verification")
 {
   return true;
 }
   router.navigate(['/login'])
   return false;
};
