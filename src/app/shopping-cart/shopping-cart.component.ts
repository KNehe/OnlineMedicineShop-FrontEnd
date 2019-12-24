import { Component, OnInit, ElementRef } from '@angular/core';
import { ManageProductsService } from '../Services/manage-products.service';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  products:Product[] = []

  //shoppingcart
  cart:Product[] = []

  //shopping cart icon
  faShoppingCart = faShoppingCart

  htmlElement:HTMLElement

  //number of items in cart
  number_of_items = 0

  cartName:string = "Empty Cart"

  cartError:string = null;

  //total price;
  totalPrice:number = null

   //used to show and hide spinner
   spinnerShown:boolean = true

  //purchase model
  purchase:Purchase ={
    id:null,
    product:null,
    amount_paid:null,
    date_paid:null,
    user:{id:0,firstName:'',lastName:'',email:'',password:'',phone:'',role:''},
    status:"Not Delivered"
  }
  
  //for pagination
  private page:number =0;

  private pages:number[] = [];

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
  getAllProducts() //requires pagination implementation
  {
    this.service.getAllProducts2(this.page).subscribe(
      response=>{
        //hide the spinner
        this.spinnerShown = false
        //remove paid message from local storage
        //just in case user had paid for a product earlier
        //it is set when a user pays successfully for items ->CheckOutComponent->purchase()
        localStorage.removeItem("Paid")
        this.products = response["content"];
        this.pages = new Array(response['totalPages']);
      },
      error=>{
          
      }
    );
  }

  //set clicked page number on pagination links
  setPage(index:any,event:any)
  {
    event.preventDefault();
    this.page = index;
    this.getAllProducts();
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
      htmlElement.classList.add('btn-change') 
      this.totalPrice +=  parseInt(product.price,10) //total price of items in the cart
      this.number_of_items = this.cart.length
      
      if(this.cart.length > 0)
      {
        this.cartName = "Check Out"
      }
      
    }else
    { 
      //when its in the cart
      this.cart.splice(this.cart.indexOf(product) ,1) 
      htmlElement.textContent = "Add To Cart"
      htmlElement.classList.remove('btn-change') 
      this.totalPrice -=  parseInt(product.price,10) //total price of items in the cart
      this.number_of_items = this.cart.length

      if(this.cart.length == 0)
      {
        this.cartName = "Empty Cart"
      }
    }

  }//add


  //go to check out component
  goToCheckOut()
  { 

    if(this.cart.length >0 && this.cart != null)
    { 
      //add cart in local storage
      localStorage.setItem("cart",JSON.stringify(this.cart))
      //change behaviorsubject value
      this.service.changeCartData(JSON.parse(localStorage.getItem("cart")))
      //navigate
      this.router.navigate(["/checkout"],{skipLocationChange:true})
    }   

    return this.cartError = "Choose an item"
        
  }


 




}
