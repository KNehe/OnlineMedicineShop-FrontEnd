import { Component, OnInit } from '@angular/core';
import { ManageProductsService } from '../Services/manage-products.service';
import { Product } from '../models/product';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { CreditCard } from '../models/credit-card';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  
  cart:Product[] = []

  totalPrice:number = null

  //credit card data
  creditCard: CreditCard ={
    cardNumber:"",
    expiryMonth:"",
    expiryYear:"",
    cvc:""
  }
  
  //used to validate form
  checkExpiryYear = true

  constructor(private productService:ManageProductsService,
    private authService:AuthenticationService,
    private router:Router) { 
 
  }

  ngOnInit() {

    this.authService.changeStatus(true)

    this.productService.currentCartData.subscribe(data => this.cart = data)

    //calculate price
    this.cart.forEach(
      item=>{
        this.totalPrice += parseInt(item.price)
      })
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
  
  //takes a user to shoopingCartComponet
  goBackToShopping(): void
  {
    this.router.navigate(["/shoppingcart"],{skipLocationChange:true})
  }

  //pay
  pay(): void 
  {
    this.checkExpiryYear = false
  }
  
  
  
}
