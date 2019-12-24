import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { LoginViewModel } from '../models/login-view-model';
import { Router } from '@angular/router';
//import { faUserCircle } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  ///font awesome icon
 // faUserCircle = faUserCircle
  
  model:LoginModel={
  username:'',
  password:'' 
  }

  loginViewModel:LoginViewModel;
  
  errorMessage = null;

   //used to show and hide spinner
   spinnerShown:boolean = false


  constructor(private authService:AuthenticationService,
              private router:Router) { }

  ngOnInit() {
      //when a user clicks log out
      //navigate here
      //remove all local storage variables
      if(this.router.url === "/logout")
      {
         this.authService.removeSessionVariable()
         //used to show appropiate links on navbar
         //show register & login links, hide logout link
         this.authService.changeStatus(false)
         return this.router.navigate(["/login"],{skipLocationChange:true})
      }  
    
  }
  
  //login user
  login(){
    
    this.errorMessage = null
    this.spinnerShown = true

    this.authService.authenticate(this.model).subscribe(
      res=>{
    
        let responseToJson = JSON.stringify(res)

        let authToken  = JSON.parse(responseToJson).token
      
        localStorage.setItem("authToken",authToken); 
        
        this.spinnerShown = false

        this.loadPage()
       },
       
      err=>{
        this.spinnerShown = false
        this.errorMessage = "Invalid Credentials"
      }
     );
  }//login

  //loadpage according to user role
  loadPage()
  {   
       
       this.authService.getUserDetails().subscribe(
         res=>{

           this.loginViewModel = res;
          
           let userid = JSON.stringify(res.id);

           localStorage.setItem("userid",userid);
           localStorage.setItem("role",res.role);
           localStorage.setItem("FirstName",res.firstname);
           
           this.authService.setUserFirstName(res.firstname);
           this.authService.setUserRole(res.role);
           
          
           if(res.role == "ADMIN")
           {
            this.router.navigate(["/manageproducts"],{skipLocationChange: true});

           }
           else if (res.role == "USER")
           {
            this.router.navigate(["/shoppingcart"],{skipLocationChange:true})
           }
         
         },
         err=>{
           this.errorMessage = "An error occured Try again!";
         }
       );
  }//load page


} 

//loginModel
export interface LoginModel
{
  username:string;
  password:string;
}

