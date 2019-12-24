import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError,retry } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor
{   
    constructor(private router:Router){}

    intercept(req:HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>
    {  
        return next.handle(req)
        .pipe(

            //retry on failure
            retry(1),

            //handle errors
            catchError(( error: any)=>{
                if(error.status == 401 || error.status == 0)
                {   
                    localStorage.clear();
                    this.router.navigate(["/login"],{skipLocationChange:true});
                }
                return throwError(error);
            }));
    }
}