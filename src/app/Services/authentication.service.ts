import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginViewModel } from '../models/login-view-model';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})



export class AuthenticationService {
   
  constructor(private httpClient:HttpClient) { }

  private base_url = "http://localhost:8082";
  
  
  //used to authenticate user and get jwt token
  authenticate(credentials:any) : Observable<any>
  {
    return this.httpClient.post(this.base_url+"/authenticate",credentials);
  }

  

  //get details -> role,id,firstname
  getUserDetails() : Observable<LoginViewModel>
  {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem("authToken")
    });
  
    return this.httpClient.get<LoginViewModel>(this.base_url+"/api/getDetails",{headers});
    
  }

  //checkLogin
  checkLogin():Boolean
  {
    if(sessionStorage.getItem("userid") === null  &&  sessionStorage.getItem("role") === null)
    {
      return false
    }
    return true
  }

  //checkRole
  checkRole() : String
  {
    if(sessionStorage.getItem("role") == "ADMIN")
    {
      return "Admin"
    }else if(sessionStorage.getItem("role") == "User")
    {
      return "User"
    }
  }


  removeSessionVariable()
  { 
    sessionStorage.clear()
  }

  
  //--will be used to display apropiate links buttons on the navabar
  //because there's no child/parent relationship between navbar and other components
  private messageSource = new BehaviorSubject(false)
  currentStatus = this.messageSource.asObservable()

  //change the above status
  changeStatus(status:boolean)
  {
    this.messageSource.next(status)
  }


  //register user
  registerUser(user:User): Observable<string>
  {
    return this.httpClient.post<string>(this.base_url+"/api/register",user);
  }

  //change password
  changePassword(model:ChangePasswordModel):Observable<string>
  {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem("authToken")
    })

   
    return this.httpClient.post<string>(this.base_url+"/api/changePassword",model,{headers}
    );
  }



  

}

export interface ChangePasswordModel{
  newPassword:string,
  confirmPassword:string,
  userId:number
}


