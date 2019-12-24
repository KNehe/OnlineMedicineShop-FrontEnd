import { Component, OnInit } from '@angular/core';
import { faCoffee, faGift, faHospital, faBandAid, } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from '../Services/authentication.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  //font awesome icons
  faCoffee  = faCoffee
  faHospital = faHospital
  faGift = faGift
  faBandAid = faBandAid

  isLoggedIn:boolean = false;
  

  ngOnInit() {
    this.authService.setUserFirstName(localStorage.getItem("FirstName"));
    this.authService.setUserRole(localStorage.getItem("role"));
    
    //means user is logged in/ or logged in and dint log out
    if(localStorage.getItem("userid") != null)
    { 
      this.authService.changeStatus(true);
      this.authService.currentStatus
      .subscribe(status => this.isLoggedIn = status);
    }
    
  }
  
}
