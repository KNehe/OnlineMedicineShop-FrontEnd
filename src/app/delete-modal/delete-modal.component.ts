import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  
  action = new Subject();

  heading: string;
  content: any;

  constructor(public mdbModalRef:MDBModalRef) { }

  ngOnInit() {
  }


  onYesClick() 
  {
    this.action.next('yes');
    this.mdbModalRef.hide();
  }

  onNoClick() 
  {
      this.action.next('No');
  }

}
