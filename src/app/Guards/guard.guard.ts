import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private authService:AuthenticationService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
         
    const role = next.data.expectedRole

    if(this.authService.checkLogin() && this.authService.checkRole() ===  role)
    {
     // alert("AUTH TRUE: "+ role + " :"+ this.authService.checkRole() );
      return true
    }
    //alert("AUTH FALSE: "+ role + " :"+ this.authService.checkRole());
    this.router.navigate(["/login"],{skipLocationChange:true});
    return false
   
  }

  

}
