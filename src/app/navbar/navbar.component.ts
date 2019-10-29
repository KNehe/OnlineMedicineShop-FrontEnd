import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(private authService:AuthenticationService) { 


  }

 
  
  //set to false when user logs in
  //used in view
  loggedIn = null

  //user's firstName
  firstName:string = null

 
  ngOnInit() {
    this.authService.currentStatus.subscribe( status => this.loggedIn = status)
    if(this.loggedIn === true)
    {
      this.firstName = sessionStorage.getItem("FirstName")
    }

     
  }

}
