import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageProductsService } from '../Services/manage-products.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  constructor(private productService:ManageProductsService) { }

  ngOnInit() {
   
    console.log(this.cartItems)
  }
  
  get cartItems()
  {
    return  this.productService.cartItems
  }
}
