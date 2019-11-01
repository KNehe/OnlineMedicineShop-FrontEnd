import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogComponent } from './edit-dialog.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppModule } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogComponent,FaIconComponent ],
      providers:[
      {provide: MAT_DIALOG_DATA, useValue:{}},
      {provide: MatDialogRef, useValue:{}}
    ],

      imports:[FormsModule, MatDialogModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
