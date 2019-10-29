import { Component, OnInit } from '@angular/core';
import { ManageProductsService } from '../../Services/manage-products.service';
import { Product } from '../../models/product';
import { SharedService } from '../../Services/shared.service';
import { faEdit , faTrash} from '@fortawesome/free-solid-svg-icons';





@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  
  //font awesome icons
  faEdit = faEdit
  faTrash = faTrash
  
  //products
  products:Product[] = [];

  filterProducts:Product[] = []

  //length- for mat-paginator
  length:number

  //default number records for paginator - defines page size
  defaultRecords:number = 3

  constructor(private productService:ManageProductsService,
               private sharedService:SharedService) {
               }
   
  ngOnInit() {
    this.getAllProducts();
  }

 
  //pagination
  onPaginateChange(data)
  {
   this.filterProducts = this.products.slice(0,data.pageSize)
  }

  //get all Products
  getAllProducts()
  {
    
    return this.productService.getAllProducts().subscribe(
      res=>{
       this.products = res;
       this.length = this.products.length //paginator record length
       this.filterProducts = this.products.slice(0,this.defaultRecords) //show only 3
      },
      error=>{
       console.log("All Products Component error: "+error.message);
      }
    );
  }


  //delete a product
  deleteProduct(product:Product)
  { 
    //show a confirm to the user
    this.sharedService.openConfirmDialog("Are Sure you want to delete: "+ product.name + " ?")
    .afterClosed()
    .subscribe(
      res=>{
        //delete if true
        if(res)
        {
         this.productService.deleteProduct(product.id).subscribe(
           res=>
           {
              let indexOfProduct = this.products.indexOf(product)   
              this.products.splice(indexOfProduct,1)  
              //alert(res)     
           },
           error=>
           {
             console.log("Delete product error: "+error.message())
           }
         )
        }//if
      }//res
    );
  }//delete method

  //edit a product
  editProduct(product:Product)
  {
    this.sharedService.openEditDailog(product);
  }
  

}
