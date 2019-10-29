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
	  role:'User'
  }

  //login model
  loginModel: LoginModel = {
    username: '',
    password: '',
  }
  
  successMessage:String = null
  errorMessage:String = null

  loginViewModel:LoginViewModel;

  constructor(private authService:AuthenticationService,
              private router:Router) { }

  ngOnInit() {
  }

  //register user
  register()
  {

    this.authService.registerUser(this.model)
    .subscribe(
      response =>{
       if(response == "User saved")
       {
        //this.successMessage = response
        //login the user if registration is successfull
        this.loginModel.username = this.model.email
        this.loginModel.password = this.model.password
        this.login()

       }else if (response == "An error occurred User not saved!")
       {
        this.errorMessage = response
       }
      },
      error=>{
        this.errorMessage ="An error occurred"
      }
    );
  }//register


  //login user
  login(){
   
    this.authService.authenticate(this.loginModel).subscribe(
      response=>{
      
        let responseToJson = JSON.stringify(response)

        let authToken  = JSON.parse(responseToJson).token

        sessionStorage.setItem("authToken",authToken); 
        
        //load page according to user role
        this.loadPage()
       },
       
      err=>{
        this.errorMessage = "An error occurred!"
      }
     );
  }//login

 //load page according to user role
  loadPage()
  {   
       
       this.authService.getUserDetails().subscribe(
         response=>{

           this.loginViewModel = response;
          
           let userid = JSON.stringify(response.id);

           sessionStorage.setItem("userid",userid);
           sessionStorage.setItem("role",response.role);
           sessionStorage.setItem("FirstName",response.firstname);

           if(response.role == "ADMIN")
           {
            this.router.navigate(["/manageproducts"],{skipLocationChange: true});
           }else if (response.role == "User")
           {
            this.router.navigate(["/shoppingcart"],{skipLocationChange:true})
           }
           //used to show appropiate links on navbar
           //hide register/login and show logout
           this.authService.changeStatus(true)
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