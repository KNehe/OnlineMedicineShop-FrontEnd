import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Product } from '../../models/product';
import { ManageProductsService } from '../../Services/manage-products.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  model:Product = {
    id:null,
    name:null,
    image:null,
    price:null,
    user:{id:0,firstName:'',lastName:'',email:'',password:'',phone:'',role:''}
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data,
             public dialogRef:MatDialogRef<EditDialogComponent>,
             private service:ManageProductsService) 
             { 
               this.model.id = data.product.id
               this.model.name = data.product.name
               this.model.image = data.product.image
               this.model.price = data.product.price
               this.model.user.id = data.product.user.id
             }

  ngOnInit() {
  }

   //selected file
   private selectedFile = <File>null

   //name of the selected image
   private imageName:String = null

   //success message
   private successMessage:String = null
  
  //close this component
  closeEditDialog():void
  {
   this.dialogRef.close(false);
  }

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
    if(this.selectedFile == null){ //if  user doesn't select an image
       //send 
       this.service.editProduct2(this.model)
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
       this.service.editProduct1(this.model,this.selectedFile)
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
