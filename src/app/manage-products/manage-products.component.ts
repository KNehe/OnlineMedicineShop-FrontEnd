import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { faCogs, faBook, faEdit, faBookOpen,faDatabase} from  '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  constructor(private authService:AuthenticationService,
              private router:Router) { }

  ngOnInit() {
    //used to show appropiate links on navbar -even after page refresh
   //hide register/login and show logout
    this.authService.changeStatus(true)
  }

  //font awesome icons
  faCogs = faCogs;
  faBookOpen = faBookOpen;
  faEdit = faEdit;
  faBook = faBook;
  faDatabase = faDatabase;

  //toggle active links
  addProductActive = false;
  settingsActive = false;
  viewOrdersActive = false;
  manageProductActive = false;
  dashboardActive = true;

  //the values of each clicked linked
  add:string = "add";
  manage:string = "manage";
  settings:string = "settings";
  vieworders:string = "vieworders";
  dashboard:string = "dashboard";

  
  //making clicked links active and disabling the others
  //by adding .activeLink class when true in the template
  makeActive(clickedLink:string): void
  { 
    
    if(clickedLink == "dashboard")
    {
      this.dashboardActive = true;
    
      this.settingsActive = false;
      this.viewOrdersActive = false;
      this.manageProductActive = false;
      this.addProductActive = false;
    }

    if(clickedLink == "add")
    {
      this.addProductActive = true;
    
      this.settingsActive = false;
      this.viewOrdersActive = false;
      this.manageProductActive = false;
      this.dashboardActive = false;
    }

    if(clickedLink == "manage")
    {
      this.manageProductActive = true;

      this.settingsActive = false;
      this.viewOrdersActive = false;
      this.addProductActive = false;
      this.dashboardActive = false;
    }

    if(clickedLink == "vieworders")
    {
      this.viewOrdersActive = true;
    
      this.manageProductActive = false;
      this.settingsActive = false;
      this.addProductActive = false;
      this.dashboardActive = false;
    }
  
    if(clickedLink == "settings")
    {
      this.settingsActive = true;
    
      this.manageProductActive = false;
      this.viewOrdersActive = false;
      this.addProductActive = false;
      this.dashboardActive = false;
    }
  }

    

  

    

    

    
  
  
}
