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
    return this.httpClient.get<LoginViewModel>(this.base_url+"/api/getDetails");
    
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
  checkRole() : string
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
    return this.httpClient.post<string>(this.base_url+"/api/changePassword",model);
  }

  getUserById():Observable<User>
  {
    let userId = parseInt(localStorage.getItem("userid"));
      
    return this.httpClient.get<User>(this.base_url+"/api/getOneUser?userId="+userId)
  }

  updateUser(user:User):Observable<string>
  {      
    return this.httpClient.post<string>(this.base_url+"/api/updateUser",user);
  }



  //--will be used to display userName on navbar
  //because there's no child/parent relationship between navbar and other components
  private userFirstNameSource = new BehaviorSubject(null)
  currentUserFirstName = this.userFirstNameSource.asObservable()

  //used to change the above currentUserFirstName
  //implemented in the NavBar component inside ngOnInit() and Login inside loadPage()
  setUserFirstName(firstName:string)
  {
    this.userFirstNameSource.next(firstName);
  }

  //--will be used to display right link on navbar drop down
  //because there's no child/parent relationship between navbar and other components
  private userRoleSource = new BehaviorSubject(null)
  currentUserRole= this.userRoleSource.asObservable()

  //used to change the above status
  //implemented in the NavBar component inside ngOnInit() and Login inside loadPage()
  setUserRole(role:string)
  {
    this.userRoleSource.next(role);
  }


 



  

}

export interface ChangePasswordModel{
  newPassword:string,
  confirmPassword:string,
  userId:number
}


