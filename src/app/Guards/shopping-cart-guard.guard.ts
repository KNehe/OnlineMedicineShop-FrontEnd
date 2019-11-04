import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartGuardGuard implements CanActivate{
  
  constructor(private authService:AuthenticationService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const role = next.data.expectedRole

    if(this.authService.checkLogin() && this.authService.checkRole() === role)
    { 
      //alert("CART TRUE"+ role  + " :"+ this.authService.checkRole());
      return true
    }
    //alert("CART FALSE"+ role + " :"+ this.authService.checkRole());
    this.router.navigate(["/login"],{skipLocationChange:true});
    return false
    
  }



 
}
