import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(private authService:AuthenticationService) { }

  
  //set to false when user logs in
  //to hide register and login links
  //but show log out link
  loggedIn = null
 
  ngOnInit() {

    this.authService.currentStatus.subscribe( status => this.loggedIn = status)
         
  }

}
