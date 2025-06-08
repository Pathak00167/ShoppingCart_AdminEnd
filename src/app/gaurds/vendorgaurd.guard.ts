import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const vendorgaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  var findrole = sessionStorage.getItem("role")
if(findrole == "Vendor")
{
  return true;
}
  router.navigate(['/login'])
  return false;
};
