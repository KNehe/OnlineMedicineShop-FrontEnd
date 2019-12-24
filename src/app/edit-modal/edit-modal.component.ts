import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Product } from '../models/product';
import { ManageProductsService } from '../Services/manage-products.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

   product:Product; //injected  to modal

   model:Product;

   action= new Subject();

  constructor(private mdbModalRef:MDBModalRef,private manageProductsService:ManageProductsService) {
   }

  ngOnInit() {
    this.model = this.product;
    // console.log(this.product);
  }

   //selected file
   private selectedFile = <File>null

   //name of the selected image
   private imageName:String = null

   //success message
   private successMessage:String = null


  //when a file is selected
  onFileSelected(event)
  {
    this.selectedFile = event.target.files[0];
     //to be shown in ui after selection 
    this.imageName = this.selectedFile.name
  }

   //edit product
  //send new product to service
  editProduct()
  { 
    this.action.next("yes");
    
    if(this.selectedFile == null){ //if  user doesn't select an image
       //send 
       this.manageProductsService.editProduct2(this.product)
       .subscribe(
         response=>{
          this.successMessage = response
         },
         error=>{
          alert("error"+error.message);
         }
       );
      
      }else{
       //send 
       this.manageProductsService.editProduct1(this.product,this.selectedFile)
       .subscribe(
         response=>{
          this.successMessage = response
         },
         error=>{
          alert("error"+error.message);
         }
       );
     }//else
  }//edit product

}
