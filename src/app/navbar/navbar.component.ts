import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { ManageProductsService } from '../Services/manage-products.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
   
  //set to false when user logs in
  //to hide register and login links
  //but show log out link
  loggedIn:boolean = false;

  userFirstName:string = null;
  userRole:string = null;

  

  constructor(private authService:AuthenticationService) { }
  
  ngOnInit() {

      
    this.authService.currentUserRole
    .subscribe(role => this.userRole = role);

    this.authService
    .currentUserFirstName
    .subscribe(firstname => this.userFirstName = firstname);

    this.authService.currentStatus
    .subscribe( status => this.loggedIn = status)
         
  }

}
