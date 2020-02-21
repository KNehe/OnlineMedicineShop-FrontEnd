import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageProductsService } from '../Services/manage-products.service';
import { Product } from '../models/product';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { CreditCard } from '../models/credit-card';
import { Purchase } from '../models/purchase';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  
  cart:Product[] = []

  totalPrice:number = 0;

  //credit card data
  creditCard: CreditCard ={
    cardNumber:"",
    expiryMonth:"",
    expiryYear:"",
    cvc:""
  }
  
  errorMessage = null
  successMessage = null

  //spinner
  spinnerShown:boolean = false

  //shown when a user refreshes the page but has already paid
  paidMessage:string = null

  //purchase object to be sent to servie
  purchaseObject:Purchase={
    id:null,
    product: {id:null,name:"",image:"",price:"",user:{id:null,firstName:"",lastName:"",email:"",password:"",phone:"",role:""}},
    amount_paid:null,
    date_paid: new Date(),
    user:{id:null,firstName:"",lastName:"",email:"",password:"",phone:"",role:""},
    status:"Not Delivered"
  }
   
  //form
  @ViewChild("f",{
    static:false
  })form:NgForm
 

  constructor(private productService:ManageProductsService,
    private authService:AuthenticationService,
    private router:Router) 
    { 
      this.paidMessage = localStorage.getItem("Paid")
    }

  ngOnInit() {

    this.authService.changeStatus(true)

    this.productService.currentCartData.subscribe(data => this.cart = data)

    //calculate price
    this.cart.forEach(
      item=>{
        this.totalPrice += parseInt(item.price)
      });
  }


  removeFromCart(item:Product):void
  {  
    //get index of item in the cart
     let index = this.cart.indexOf(item)

     const newCart = this.cart
    
     //remove it
     newCart.splice(index,1)
     
     //update local storage
     localStorage.setItem("cart",JSON.stringify(newCart))
     
     //update behaviorsubject
     this.productService.changeCartData(JSON.parse(localStorage.getItem("cart")))

     //calculate price
     this.totalPrice = this.totalPrice - parseInt(item.price)
     
  }
  
  //takes a user to shoopingCartComponent
  goBackToShopping(): void
  {
    this.router.navigate(["/shoppingcart"],{skipLocationChange:true})
  }

  //pay
  pay() :any
  {  
    if(this.cart == null || this.cart.length == 0)
    {
      return this.errorMessage = "Empty Cart!"
    }
    if(this.totalPrice != 0 || this.totalPrice != null)
    {
      this.purchase()
    }
    else
    {
      return this.errorMessage = "No items to buy"
    }
  }

  //send to service
  purchase() :any
  {  
     //show the spinner
      this.spinnerShown = true
      
      //send each purchases item to db
      this.cart.forEach(item=>{
 
      this.purchaseObject.product.id = item.id //product id
      this.purchaseObject.product.user.id = item.user.id //createdby
      this.purchaseObject.user.id = parseInt(localStorage.getItem("userid")) // purchasedby
      this.purchaseObject.amount_paid = parseInt(item.price)

      this.productService
      .sendPurchase(this.purchaseObject,this.creditCard.cardNumber,
                    this.creditCard.expiryMonth,this.creditCard.expiryYear,
                    this.creditCard.cvc,item.price)
      .subscribe(
        response=>{
          this.errorMessage = null // to remove error message if present
          this.spinnerShown = false
          this.successMessage = response
          this.form.resetForm()
          //to be used when user refreshes the page
          localStorage.setItem("Paid","Paid! We shall call you shortly")
  
        },
        error=>{
          this.successMessage = null // to remove success message if present
          this.spinnerShown = false
          this.errorMessage = error.error
          this.form.resetForm()
          console.log("PurchaseComponent: PurchaseError: ",error)
        }
      )
      
      
      

     })
  }

  
  
   
}
