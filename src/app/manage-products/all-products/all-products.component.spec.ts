import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsComponent } from './all-products.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppModule } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FormsModule } from '@angular/forms';

// describe('AllProductsComponent', () => {
//   let component: AllProductsComponent;
//   let fixture: ComponentFixture<AllProductsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ AllProductsComponent,FaIconComponent],
//       providers:[AppModule],
//       imports:[
//         FormsModule,MatDialogModule, 
//         MatTableModule,BrowserAnimationsModule,
//         MatPaginatorModule,MatSortModule,
//         HttpClientModule,RouterModule.forRoot([])
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AllProductsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
