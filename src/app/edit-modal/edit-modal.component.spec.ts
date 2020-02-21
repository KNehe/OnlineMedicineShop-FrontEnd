import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalComponent } from './edit-modal.component';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule, MDBModalRef } from 'angular-bootstrap-md';
import { AppModule } from '../app.module';
import { HttpClientModule } from '@angular/common/http';

// describe('EditModalComponent', () => {
//   let component: EditModalComponent;
//   let fixture: ComponentFixture<EditModalComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ EditModalComponent],
//       providers:[AppModule,MDBModalRef],
//       imports:[HttpClientModule, FormsModule,MDBBootstrapModule.forRoot()],
      
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(EditModalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
