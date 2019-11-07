import { Component, OnInit, ElementRef } from '@angular/core';
import { ManageProductsService } from '../Services/manage-products.service';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  products:Product[] = []

  //shoppingcart
  cart:Product[] = []

  htmlElement:HTMLElement

  //total price;
  totalPrice:number = null

  //purchase model
  purchase:Purchase ={
    id:null,
    product:null,
    amount_paid:null,
    date_paid:null,
    user:{id:0,firstName:'',lastName:'',email:'',password:'',phone:'',role:''},
    status:"Not Delivered"
  }

  //purchase success response
  purchase_success:String =  null


  constructor(private service:ManageProductsService,
              private snackbar:MatSnackBar,
              private authService:AuthenticationService,
              private router:Router) 
              { 
       this.ngOnInit()
  }

  ngOnInit() {
    
    this.getAllProducts()
    //used to show appropiate links on navbar -even after page refresh
    //hide register/login and show logout
    this.authService.changeStatus(true)
     
  }//init


  //get all products
  getAllProducts()
  {
    this.service.getAllProducts().subscribe(
      response=>{
        this.products = response
      },
      error=>{
          
      }
    );
  }

  //toggle between add / remove to cart
  //when user clicks on add to cart button
  addToCart(product:Product,htmlElement:HTMLElement)
  { 
    this.htmlElement = htmlElement //reference to current clicked button

    //when product isn't in the cart
    if( (this.cart.indexOf(product)) < 0){ 
      this.cart.push(product)
      htmlElement.textContent = "Remove From Cart"
      htmlElement.classList.add('btn-change') //button changes red
      this.totalPrice +=  parseInt(product.price,10) //total price of items in the cart
      this.purchase_success = null //
    }else
    { 
      //when its in the cart
      this.cart.splice(this.cart.indexOf(product) ,1) 
      htmlElement.textContent = "Add To Cart"
      htmlElement.classList.remove('btn-change')  //button changes to blue
      this.totalPrice -=  parseInt(product.price,10) //total price of items in the cart
      this.purchase_success = null //
    }

  }//add


  //purchase products
  purchaseProducts(){

    let number_of_cart_items = this.cart.length
    let counter = 0

    this.cart.forEach(cartItem =>{

      this.purchase.amount_paid = parseInt(cartItem.price)
      this.purchase.date_paid = new Date()
      this.purchase.product =  cartItem
      this.purchase.user.id = parseInt(sessionStorage.getItem("userid"))
      
      counter ++

      this.service.sendPurchase(this.purchase)
      .subscribe(
        response=>{
          
          if(counter === number_of_cart_items){
            this.purchase_success = response
            this.snackbar.open(response,'',{
              duration:3000
            })
          }
          
      },
      error=>{
        alert(error)
      });

    });
  }
 

 




}
