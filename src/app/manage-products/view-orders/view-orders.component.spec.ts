import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdersComponent } from './view-orders.component';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppModule } from 'src/app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatFormField, MatTableModule, MatFormFieldModule, MatIconModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('ViewOrdersComponent', () => {
//   let component: ViewOrdersComponent;
//   let fixture: ComponentFixture<ViewOrdersComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ViewOrdersComponent,FaIconComponent],
//       providers:[AppModule],
//       imports:
//       [FormsModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatPaginatorModule,
//         MatTableModule,
//         MatIconModule,
//         HttpClientModule,
//         BrowserAnimationsModule,
//         RouterModule.forRoot([])]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ViewOrdersComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
