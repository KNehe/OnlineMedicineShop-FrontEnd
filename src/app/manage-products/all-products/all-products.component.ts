import { Component, OnInit } from '@angular/core';
import { ManageProductsService } from '../../Services/manage-products.service';
import { Product } from '../../models/product';
import { faEdit , faTrash} from '@fortawesome/free-solid-svg-icons';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';





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

  //reference to MDB modal
  mdbModalRef:MDBModalRef;

  //to be shown if an admin has just created an account
  //and hasn't created any product
  //or when he has deleted all products
  noProductsMessage:String = null;
  

  constructor(private productService:ManageProductsService,
               private mdbModalService:MDBModalService,
               private router:Router) {
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
       
       if(this.products == null || this.products.length == 0)
       {
         this.noProductsMessage = "You have no products in store!";
       }
      //  console.log(result);
      },
      error=>{
       console.log("All Products Component error: "+error.message);
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

  deleteProduct(product:Product)
  { 
    this.mdbModalRef = this.mdbModalService.show(DeleteModalComponent,{
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      animated: true,
      data: {
        heading: "Confirm Deletion",
        content: {
           heading: 'Content heading', 
           description: "Are sure you want to delete "+ product.name}
    }
  });//show

   this.mdbModalRef.content.action
   .subscribe(
     (result:any )=>{
       if(result == "yes")
       {
        this.productService.deleteProduct(product.id).subscribe(
          res=>
          {
             let indexOfProduct = this.products.indexOf(product);
             this.products.splice(indexOfProduct,1);     
          },
          error=>
          {
            console.log("Delete product error: "+error.message())
          }
        )
         
       }//if
     }
   );
  }

  //edit a product
  editProduct(product:Product)
  {
    this.mdbModalRef = this.mdbModalService.show(EditModalComponent,{
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      animated: true,
      data: {
        product:product
    }
  });
  
  this.mdbModalRef.content.action
  .subscribe( 
    (result:any)=>{

      if(result == "yes") 
      { 
        //not working
        this.router.navigate(["/manageproducts"],{skipLocationChange:true});
      }
    
    }
  
  );
   
  }//edit product



}
