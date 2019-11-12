import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageProductsService } from '../Services/manage-products.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  
  cart:Product[] = []

  constructor(public activatedRoute:ActivatedRoute) { 
 
  }

  ngOnInit() {
    const key :Product = this.activatedRoute.snapshot.params["cart"]
    console.log(key)
  }
  
  
}
