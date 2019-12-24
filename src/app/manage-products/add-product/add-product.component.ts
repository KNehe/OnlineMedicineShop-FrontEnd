import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProductsService } from '../../Services/manage-products.service';
import { Product } from '../../models/product';
import { NgForm } from '@angular/forms';





@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  model:Product= {
    id:null,
    name:'',
    image:null,
    price:'',
    user:{id:0,firstName:'',lastName:'',email:'',password:'',phone:'',role:''}
  }
  
  //shown when no image is picked
  imageError:String = null

  //shown when an image is picked
  imageName:String = null;

  //when product is found in db
  errorMessage:String  =null;
  
   //form
   @ViewChild("f",{
    static:false
  })form:NgForm

  //used to hide and show spinner 
  spinnerShown:boolean = false;
 
  constructor(private router:Router,private service:ManageProductsService) { }


  ngOnInit() {
  }

  private selectedFile = <File>null;

  successMessage:String = '';

  

  //hanlding event when input type="file" triggered
  onFileSelected(event){
     this.selectedFile = event.target.files[0];
     this.imageError = ""
     //to be shown in ui after selection 
     this.imageName = this.selectedFile.name;
  
  }

  //set file along with product details and send to service
  addProduct(){

    if(this.selectedFile == null)
    {
     return this.imageError = "Please pick an image"

    }else{

      //show the spinner
      this.spinnerShown = true;

      //remove the error
      this.imageError = ""   
      //get the user id and convert it to an integer/number  
      this.model.user.id = parseInt(localStorage.getItem("userid"));
    
      //send product to service
      this.service.addProduct(this.model,this.selectedFile)
      .subscribe(
        res=>{  
          //hide spinner
          this.spinnerShown = false;

          if(res === "Product exists !")
          {
            this.errorMessage = res
          }else{
            this.successMessage = res
            this.errorMessage = null
            this.form.resetForm();
            this.imageName = '' 
          }
        },
        error=>{
          this.spinnerShown = false;
          console.log("addProduct error: "+ error.message);
        }
      );

    }//esle
  }//addProduct
  
  
  


}

