import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { AppModule } from '../app.module';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatIconModule, MatDialogModule, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RouterModule } from '@angular/router';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent,FaIconComponent ],
      providers:[
        {provide: MAT_DIALOG_DATA, useValue:{}},
        {provide: MatDialogRef, useValue:{}}
      ],
      imports:[MatIconModule,MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
