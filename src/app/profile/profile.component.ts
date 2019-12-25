import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  //hide/show spinner
  spinnerShown:boolean = true;

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

  passModel:ChangePasswordModel ={
    newPassword:'',
    confirmPassword:'',
    userId:null
  }

  passwordSuccesMessage:string = null;
  passwordErrorMessage:string = null;


  //errorMessage
  errorMessage:string =null;
  //successMessage
  succesMessage:string = null;

  //getting references to inputs
  @ViewChild("firstName",{static:true}) input1: ElementRef<HTMLElement>;

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {

    //means user is logged in/ or logged in and dint log out
    if(localStorage.getItem("userid") != null)
    { 
      this.authService.changeStatus(true);
 
      this.authService.setUserFirstName(localStorage.getItem("FirstName"));
      this.authService.setUserRole(localStorage.getItem("role"));
      
      this.getUserDetails();

      this.triggerClick();
    }

  }
  
  //get user details
  getUserDetails()
  {
    this.authService.getUserById()
    .subscribe(
      result=>{
        this.spinnerShown = false;
        return this.model = result;
      },
      error=>{
        return console.log("Error in profile component: ", error.error);
      }
    )
  }
  
  //save changes
  save()
  {
       this.errorMessage = null;
    
      this.spinnerShown = true;
  
    
    this.authService.updateUser(this.model)
    .subscribe(
      response=>{
        this.spinnerShown = false;
        this.succesMessage = response;
      },
      error=>{
        this.spinnerShown = false;
        console.log("Error in Profile component: Save Method: ", error.error);
      }
    );
    

  }


  changePasword()
  { 
    this.spinnerShown = true;

    if(this.passModel.newPassword != this.passModel.confirmPassword)
    { 
      this.spinnerShown = false;
      return this.passwordErrorMessage = "Passwords don't match !";
    }

    this.passModel.userId = this.model.id;

    this.authService.changePassword(this.passModel)
    .subscribe(
      response=>{
        this.spinnerShown = false;
        this.passwordErrorMessage = null;
        this.passwordSuccesMessage = response;
      },
      error=>{
        this.spinnerShown = false;
        this.passwordErrorMessage = error.error;
      }
    )
    
  }

  //trigger clicks on form input
  //to make content visible and push labels up
  triggerClick() //not working
  { 
    let el1: HTMLElement = this.input1.nativeElement;
    el1.click();
  }

}
export interface ChangePasswordModel{
  newPassword:string,
  confirmPassword:string,
  userId:number
}

