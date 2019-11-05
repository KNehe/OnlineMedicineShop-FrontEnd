import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';


@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {
 
  
  //url for all requests
  private base_url = "http://localhost:8082";

  constructor(private httpClient:HttpClient) {}
    
  

  //add product
  addProduct(product:Product,file:File) :Observable<any>
  {   
      const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("authToken"),
      ProductId : ''+0,
      ProductName: '' + product.name,
      ProductPrice: ''+product.price,
      AddedBy: ''+product.user.id
    })

      let formData = new FormData();
      formData.append("file",file);

    return this.httpClient.post<any>(this.base_url+"/api/addProduct",formData,{headers});
    
  }

  //get all products
  getAllProducts() : Observable<Product[]>
   {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("authToken")})
    
     return this.httpClient.get<Product[]>(this.base_url+"/api/allProducts",{headers});

     
   }

  //delete a product
  deleteProduct(id:number) : Observable<String> 
  {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("authToken")})

     return this.httpClient.delete<String>(this.base_url+"/api/deleteProduct/"+id,{headers});
  }

    //edit product
    //takes a file
  editProduct1(product:Product,file:File) :Observable<any>
    {   
     
        const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("authToken"),
        ProductId: '' + product.id,
        ProductName: '' + product.name,
        ProductPrice: ''+product.price,
        AddedBy: ''+product.user.id
      })

        let formData = new FormData();
        formData.append("file",file);
        console.log(headers);
  
      return this.httpClient.post<any>(this.base_url+"/api/editProduct1",formData,{headers});
      
    }

    //editproduct
    //takes only a product,file is included as bytes in the product Object
    editProduct2(product:Product) :Observable<any>
    {  
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("authToken")})
      return this.httpClient.post<any>(this.base_url+"/api/editProduct2",product,{headers});
      
    }

    //send purchased items to backend
    sendPurchase(purchase:Purchase) : Observable<any>
    {   
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("authToken")})

      return this.httpClient.post<any>(this.base_url+"/api/purchase",purchase,{headers});
    }

     //get purchased items to backend
     getAllPurchases() : Observable<Purchase[]>
     {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("authToken")})

       return this.httpClient.get<Purchase[]>(this.base_url+"/api/getAllPurchases",{headers});
     }


   //change shopping cart value
  private messageSource = new BehaviorSubject("0")
  currentValue = this.messageSource.asObservable()

  changeValue(value:string)
  {
    this.messageSource.next(value)
  }
  
  
}
