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

  private spinnerShown:boolean = true;
  
  //products
  products:Product[] = [];

  private page:number =0;

  private pages:number[] = [];
  

  constructor(private productService:ManageProductsService,
               private sharedService:SharedService) {
               }
   
  ngOnInit() {
    this.getAllProducts();
  }

 

  //get all Products
  getAllProducts()
  {
    
    return this.productService.getAllProducts(this.page) 
    .subscribe(
      result=>{
       this.products = result['content'];
       this.pages = new Array(result['totalPages']);
       this.spinnerShown = false;
      //  console.log(result);
      },
      error=>{
       console.log("All Products Component error: "+error.message);
      }
    );
  }

  //set clicked page number on pagination links
  setPage(i:any,event:any)
  {
    event.preventDefault();
    this.page = i;
    this.getAllProducts();
  }


  //delete a product
  deleteProduct(product:Product)
  { 
    //show a confirm to the user
    this.sharedService.openConfirmDialog("Are Sure you want to delete: "+ product.name + " ?")
    .afterClosed()
    .subscribe(
      res=>{
        //res returns a boolean
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
