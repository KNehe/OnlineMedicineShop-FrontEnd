import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageProductsService } from 'src/app/Services/manage-products.service';
import { MatPaginator, MatTableDataSource ,MatSort} from '@angular/material';
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import { Orders } from 'src/app/models/Orders';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
   
  //font awesome
  faPhone = faPhone

  orders:Orders[] = []
  
  dataSource: MatTableDataSource<any>;

  //for mat-table
  displayedColumns: string[] = ['Id',"customername","products","amountpaid","phone","date_paid","status","confirm"]; 

  @ViewChild(MatSort,{static:true}) sort:MatSort
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator


  //search value
  searchKey:string;
  
  //used to hide and show a spinner
  //when user gets to this view
  //spinner is hidden when data is loaded
  spinnerShown:boolean = true;

  //used to show progress when confirming a delivery
  confirmSpinnerShown:boolean = false;

  //confirm message
  confirmMessage:String = null;

  //reference to MDB modal
  modalRef:MDBModalRef;

  //
  delivered:string = "Delivered";
  notdelivered:string ="Not Delivered";

  //when no orders found
  //meaning no customer has bought an Admin's products
  //show this message
  noPurchaseMade:string = null;

  constructor(private service:ManageProductsService,private  modalService:MDBModalService) {
     
   }

  ngOnInit() {
    this.getAllPurchases()    
  }

  openConfirmModal(selectedOrder:Orders): void
  { 
    //heading and description
    let heading:string = null;
    let  description:String = null;

    if(selectedOrder.status == this.delivered)
    {
      heading = "CANCEL DELIVERY";
      description = "Are you sure you want to cancel delivery";

    }else if(selectedOrder.status == this.notdelivered)
    {
      heading = "CONFIRM DELIVERY";
      description = "Are you sure you want to confirm delivery";
    }

    this.modalRef = this.modalService.show(ConfirmModalComponent,{
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        animated: true,
        data: {
          heading: heading,
          content: {
             heading: 'Content heading', 
             description: description}
      }
    });

    this.modalRef.content.action.subscribe(
       (result: any) => { 
       
        if(result == "yes")
        { 
          // return alert(selectedOrder.user_id +" "+ selectedOrder.date_paid);
          this.confirmSpinnerShown = true;
          this.updatePurchaseStatus(selectedOrder);        
        }
      
        });

  }//open dialog


  //update purchase status
  updatePurchaseStatus(order:Orders)
  { 

    if(order.status == this.notdelivered)
    {
      order.status = "Delivered";

    }else if (order.status == this.delivered)
    {
      order.status = "Not Delivered";

    }

    this.service.updatePurchaseStatus(order)
    .subscribe(
     result =>{
       this.confirmSpinnerShown = false;
       this.confirmMessage = order.status+" to " + order.firstname + " " +order.lastname;
     },
     error=>
     {
       this.confirmSpinnerShown = false;
       console.log("update error", error);
     }
    );
    
  }

  getAllPurchases()
  {
   this.service.getAllPurchases()
   .subscribe(
     response=>{
       this.spinnerShown = false;
       this.orders = response
      //  console.log(JSON.parse(JSON.stringify(this.orders)))
       this.dataSource = new MatTableDataSource(this.orders)
       //custom mat table sort function
      //  this.sortDataAccessor()
       this.dataSource.sort = this.sort
       this.dataSource.paginator = this.paginator

       if(this.orders == null || this.orders.length == 0)
       {
         this.noPurchaseMade = "No customer has bought your products";
       }
     },
     error=>{
        this.spinnerShown = false;
     }
   );
  }//getAllPurchases

  clearSearch()
  {
    this.searchKey = ""
    this.applyFilter();
    // clear message
    this.confirmMessage = null;
  }

  applyFilter():void
  { 
    // clear message
    this.confirmMessage = null;
    this.dataSource.filter = this.searchKey.toLowerCase().trim();
  }



 }
