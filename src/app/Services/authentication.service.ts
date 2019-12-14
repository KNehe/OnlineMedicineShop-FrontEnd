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
  
  
  //get auth token
  getAuthToken()
  {
    return localStorage.getItem("authToken")
  }

  //used to authenticate user and get jwt token
  authenticate(credentials:any) : Observable<any>
  {
    return this.httpClient.post(this.base_url+"/authenticate",credentials);
  }

  
  //get details -> role,id,firstname
  getUserDetails() : Observable<LoginViewModel>
  {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("authToken")})
    return this.httpClient.get<LoginViewModel>(this.base_url+"/api/getDetails",{headers});
    
  }

  //checkLogin
  checkLogin():boolean
  {
    if(localStorage.getItem("userid") === null  &&  localStorage.getItem("role") === null)
    {
      return false
    }
    return true
  }

  //checkRole
  checkRole() : String
  {
    if(localStorage.getItem("role") == "ADMIN")
    {  
      
      return "ADMIN"
    }else if(localStorage.getItem("role") == "USER")
    {
      return "USER"
    }
  }


  removeSessionVariable()
  { 
    localStorage.clear()
  }

  
  //--will be used to display apropiate links buttons on the navbar
  //because there's no child/parent relationship between navbar and other components
  private messageSource = new BehaviorSubject(false)
  currentStatus = this.messageSource.asObservable()

  //used to change the above status
  //implemented in the Login and NavBar component inside ngOnInit()
  changeStatus(status:boolean)
  {
    this.messageSource.next(status)
  }


  //register user
  registerUser(user:User): Observable<string>
  {
    return this.httpClient.post<string>(this.base_url+"/register",user);
  }

  //change password
  changePassword(model:ChangePasswordModel):Observable<string>
  {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("authToken")})

    return this.httpClient.post<string>(this.base_url+"/api/changePassword",model,{headers});
  }

 



  

}

export interface ChangePasswordModel{
  newPassword:string,
  confirmPassword:string,
  userId:number
}


