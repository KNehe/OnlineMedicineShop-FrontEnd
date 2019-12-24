import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
  }
  
  model:ChangePasswordModel ={
    newPassword:'',
    confirmPassword:'',
    userId:null
  }

  successMessage:string = null
  errorMessage:string = null;
   
  @ViewChild('f',{
   static:false
  })form:NgForm

  spinnerShown:boolean = false;

   changePassword()
  {
     this.spinnerShown = true;
    if(this.model.newPassword != this.model.confirmPassword)
    { 
      this.spinnerShown = false;
      this.successMessage = null;
      return this.errorMessage = "Passwords don't match"
    }

    this.model.userId = parseInt(localStorage.getItem("userid"))

    this.authService.changePassword(this.model)
    .subscribe(
      response=>{
        this.spinnerShown = false;
        this.errorMessage = null
        this.form.resetForm();
        this.successMessage = response
      },
      error=>{
        this.errorMessage = "An error occured !"
      }
    )
  }


}

export interface ChangePasswordModel{
  newPassword:string,
  confirmPassword:string,
  userId:number
}
