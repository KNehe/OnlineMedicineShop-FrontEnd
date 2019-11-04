import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanActivate  {
  
  constructor(private authService:AuthenticationService,private router:Router)
  {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.authService.checkLogin() && this.authService.checkRole() === "ADMIN")
    {
      this.router.navigate(["/manageproducts"],{skipLocationChange:true})
      return false
    }
    else if(this.authService.checkLogin() && this.authService.checkRole() === "USER")
    {
      this.router.navigate(["/shoppingcart"],{skipLocationChange:true})
    }
    else
    { 
      return true;
    }
   
  }
  
}
