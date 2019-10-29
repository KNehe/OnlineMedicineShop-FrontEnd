import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { EditDialogComponent } from '../manage-products/edit-dialog/edit-dialog.component';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private dialog:MatDialog) { }


  openConfirmDialog(message:String)
  {
   return this.dialog.open(DialogComponent,{
      width:'400px',
      panelClass:'confirm-dialog-container',
      disableClose: true,
      data:{
        message: message
      }
    });
  }

  openEditDailog(product:Product)
  {
    return this.dialog.open(EditDialogComponent,{
      width:'40%',
      disableClose:true,
      data:{
        product:product
      }
    });
  }
}
