import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { AppModule } from '../app.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MdbCardImageComponent, MdbCardBodyComponent, MdbCardComponent, MdbCardTitleComponent, MdbCardTextComponent } from 'angular-bootstrap-md';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartComponent,FaIconComponent,MdbCardImageComponent,MdbCardBodyComponent,MdbCardComponent,MdbCardTitleComponent,MdbCardTextComponent ],
      providers:[AppModule],
      imports:[HttpClientModule,MatSnackBarModule,RouterModule.forRoot([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
