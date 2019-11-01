import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { faCogs, faBook, faEdit, faBookOpen} from  '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  constructor(private authService:AuthenticationService,
              private router:Router) { }

  ngOnInit() {
    //check if user is logged in and is an admin
   /* if( !this.authService.checkLogin()  && this.authService.checkRole() != "Admin")
    {
      return this.router.navigate(["/login"],{skipLocationChange:true})
    }*/
    //used to show appropiate links on navbar -even after page refresh
   //hide register/login and show logout
    this.authService.changeStatus(true)
  }

  //font awesome icons
  faCogs = faCogs
  faBookOpen = faBookOpen
  faEdit = faEdit
  faBook = faBook
  
}
