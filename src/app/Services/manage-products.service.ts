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

  //get all products for Admins
  getAllProducts(page:number) : Observable<Product[]>
   {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("authToken")
    });
    
    const userId = localStorage.getItem("userid");

    return this.httpClient.get<Product[]>(this.base_url+"/api/allProducts?page="+page + "&hash="+userId,{headers});

   }

    //get all products for users
  getAllProducts2(page:number) : Observable<Product[]>
  {
   const headers = new HttpHeaders({
     Authorization: 'Bearer ' + localStorage.getItem("authToken")
   });
   
   const userId = localStorage.getItem("userid");

   return this.httpClient.get<Product[]>(this.base_url+"/api/allProducts2?page="+page,{headers});

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
    sendPurchase(purchase:Purchase,cardNumber:String,expiryMonth:string,expiryYear:string,cvc:string,amount:String) : Observable<any>
    { 
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("authToken"),
        cardNumber: ''+cardNumber,
        month:''+expiryMonth,
        year:''+expiryYear,
        cvc:''+cvc,
        amount:''+amount      
      })

      return this.httpClient.post<any>(this.base_url+"/api/purchase",purchase,{headers});
    }

     //get purchased items to backend
     getAllPurchases() : Observable<Orders[]>
     {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("authToken")
      });
      
      let hash = localStorage.getItem("userid");
       return this.httpClient.get<Orders[]>(this.base_url+"/api/getAllPurchases?hash="+hash,{headers});
     }

     //updatePurchaseStatus
     updatePurchaseStatus(order:Orders) : Observable<String>
     {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("authToken")
      });

      return this.httpClient.put<String>(this.base_url+"/api/updatePurchaseStatus",order,{headers});
     }

     //get statisitcs
     getStatistics(): Observable<Statistics>
     {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("authToken")
      });

      let hash = localStorage.getItem("userid");

      return this.httpClient.get<Statistics>(this.base_url+"/api/statistics?hash="+hash,{headers});

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
