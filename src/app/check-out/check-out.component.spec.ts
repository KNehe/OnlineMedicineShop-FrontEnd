import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutComponent } from './check-out.component';
import { MdbIconComponent, MdbCardComponent, MDBRootModule, MdbCardTitleComponent, MdbCardBodyComponent } from 'angular-bootstrap-md';
import { AppModule } from '../app.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// describe('CheckOutComponent', () => {
//   let component: CheckOutComponent;
//   let fixture: ComponentFixture<CheckOutComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ CheckOutComponent,MdbCardComponent ,MdbCardBodyComponent,
//         MdbIconComponent,MdbCardTitleComponent],
//       providers:[AppModule],
//       imports:[FormsModule, HttpClientModule,RouterModule.forRoot([])]
//     })
//     .compileComponents();
//   }));


//   beforeEach(() => {
//     fixture = TestBed.createComponent(CheckOutComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
