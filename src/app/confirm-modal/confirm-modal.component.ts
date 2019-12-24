import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  heading: string;
  content: any;

  constructor(public modalRef:MDBModalRef) { }
  
  action = new Subject();

  ngOnInit() {
  }

  onYesClick() {
    this.action.next('yes');
    this.modalRef.hide();
}

onNoClick() {
    this.action.next('No');
}
   

}
