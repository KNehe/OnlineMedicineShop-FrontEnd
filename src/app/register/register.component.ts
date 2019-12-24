import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../Services/authentication.service';
import { LoginViewModel } from '../models/login-view-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   
  //reigstration model
  model:User = {
    id:null,
    firstName:'',
	  lastName:'',
	  email:'',
	  password:'',
	  phone:'',
	  role:''
  }

  //login model
  loginModel: LoginModel = {
    username: '',
    password: '',
  }
  
  successMessage:String = null
  errorMessage:String = null

  loginViewModel:LoginViewModel;

  //used to hide and show spinner
  spinnerShown:boolean = false;

  constructor(private authService:AuthenticationService,
              private router:Router) { }

  ngOnInit() {
  }

  //register user
  register()
  {
    //show spinner
    this.spinnerShown = true;
    this.authService.registerUser(this.model)
    .subscribe(
      response =>{
        //hide spinner
        this.spinnerShown = false;

        let responseToJson = JSON.stringify(response)

        let authToken  = JSON.parse(responseToJson).token
         
        localStorage.setItem("authToken",authToken)

        this.loadPage()

      },
      error=>{
        this.spinnerShown = false;
      
        this.errorMessage = error.error
      }
    );
  }//register


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