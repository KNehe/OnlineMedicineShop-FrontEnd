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
  loggedIn = null


  
  number = null //shoping cart items
  constructor(private authService:AuthenticationService,
              private manageProductService:ManageProductsService) { }
  
  ngOnInit() {

    this.authService.currentStatus.subscribe( status => this.loggedIn = status)
         
  }

}
