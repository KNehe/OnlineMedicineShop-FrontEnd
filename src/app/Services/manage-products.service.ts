import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';
import { Orders } from '../models/Orders';
import { Statistics } from '../models/statistics';


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
      let formData = new FormData();
      formData.append("file",file);

    return this.httpClient.post<any>(this.base_url+"/api/addProduct?ProductName="+product.name 
           +"&ProductPrice="+product.price 
           + "&AddedBy="+product.user.id ,formData);
    
  }

  //get all products for Admins
  getAllProducts(page:number) : Observable<Product[]>
   {
    const userId = localStorage.getItem("userid");

    return this.httpClient.get<Product[]>(this.base_url+"/api/allProducts?page="+page + "&hash="+userId);

   }

    //get all products for users
  getAllProducts2(page:number) : Observable<Product[]>
  {   
   return this.httpClient.get<Product[]>(this.base_url+"/api/allProducts2?page="+page);

  }

  //delete a product
  deleteProduct(id:number) : Observable<String> 
  {
     return this.httpClient.delete<String>(this.base_url+"/api/deleteProduct/"+id);
  }

    //edit product
    //takes a file
  editProduct1(product:Product,file:File) :Observable<any>
    {
        let formData = new FormData();
        formData.append("file",file);
      
      return this.httpClient.post<any>(this.base_url+"/api/editProduct1?ProductId="+product.id
             + "&ProductName="+ product.name
             + "&ProductPrice="+ product.price
             + "&AddedBy="+ product.user.id ,formData);
      
    }

    //editproduct
    //takes only a product,file is included as bytes in the product Object
   editProduct2(product:Product) :Observable<any>
    {  
      return this.httpClient.post<any>(this.base_url+"/api/editProduct2",product);
      
    }

    //send purchased items to backend
    sendPurchase(purchase:Purchase,cardNumber:String,expiryMonth:string,expiryYear:string,cvc:string,amount:String) : Observable<any>
    {
      return this.httpClient.post<any>(this.base_url+"/api/purchase?cardNumber="+cardNumber
              + "&month="+expiryMonth
              + "&year="+expiryYear
              + "&cvc="+ cvc
              + "&amount="+ amount ,purchase);
    }

     //get purchased items to backend
     getAllPurchases() : Observable<Orders[]>
     {
      let hash = localStorage.getItem("userid");
       return this.httpClient.get<Orders[]>(this.base_url+"/api/getAllPurchases?hash="+hash);
     }

     //updatePurchaseStatus
     updatePurchaseStatus(order:Orders) : Observable<String>
     {
      return this.httpClient.put<String>(this.base_url+"/api/updatePurchaseStatus",order);
     }

     //get statisitcs
     getStatistics(): Observable<Statistics>
     {

      let hash = localStorage.getItem("userid");

      return this.httpClient.get<Statistics>(this.base_url+"/api/statistics?hash="+hash);

     }

    
      
     //set cart items data
     //to be used in shopping cart.ts and checkout.ts
     cartItems:Product[] = []

    //behavior subject for cart and shopping cart
    subjectParam = JSON.parse(localStorage.getItem("cart"))
    private cartDataSource = new BehaviorSubject(this.subjectParam)
    currentCartData = this.cartDataSource.asObservable()

    changeCartData(data:Product[])
    {
      this.cartDataSource.next(data)
    }

  
}
