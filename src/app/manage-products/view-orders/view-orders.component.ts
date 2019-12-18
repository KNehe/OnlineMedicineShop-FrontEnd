import { Component, OnInit, ViewChild } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { ManageProductsService } from 'src/app/Services/manage-products.service';
import { MatPaginator, MatTableDataSource ,MatSort} from '@angular/material';
import {faPhone} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  
  //font awesome
  faPhone = faPhone

  purchases:Purchase[] = []
  
  dataSource: MatTableDataSource<any>;

  //for mat-table
  displayedColumns: string[] = ['id','customer.name','product.name','amount_paid','date_paid','product.user.phone','status',"Confirm"]; 

  @ViewChild(MatSort,{static:true}) sort:MatSort
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator


  //search value
  searchKey:String

  constructor(private service:ManageProductsService) {
     
   }

  ngOnInit() {
    this.getAllPurchases()
    
  }

  getAllPurchases()
  {
   this.service.getAllPurchases()
   .subscribe(
     response=>{
       this.purchases = response
       //console.log(JSON.parse(JSON.stringify(this.purchases)))
       this.dataSource = new MatTableDataSource(this.purchases)
       //custom mat table sort function
       this.sortDataAccessor()
       this.dataSource.sort = this.sort
       this.dataSource.paginator = this.paginator
     },
     error=>{

     }
   );
  }//getAllPurchases

  clearSearch()
  {
    this.searchKey = ""
    this.filterTable()
  }

  //filter table
  filterTable()
  {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
    return   data.product.name.toLowerCase().includes(filter) 
            || data.user.firstName.toLowerCase().includes(filter) 
            || data.user.lastName.toLowerCase().includes(filter)
            || data.date_paid.toLowerCase().includes(filter) 
            || data.user.phone.toLowerCase().includes(filter)
     };
  
     this.dataSource.filter = this.searchKey.trim().toLowerCase()
  }


  //custom mat table sorter
  sortDataAccessor()
  {
    this.dataSource.sortingDataAccessor = (item,property) =>{
      switch(property){
        case 'product.name': return item.product.name
        case 'customer.name': return item.user.firstName
        case 'product.user.phone': return item.product.user.phone
        default: return item[property]
      }
    };
  }

}
