import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppModule } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// describe('SettingsComponent', () => {
//   let component: SettingsComponent;
//   let fixture: ComponentFixture<SettingsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SettingsComponent,FaIconComponent ],
//       providers:[AppModule],
//       imports:[FormsModule,HttpClientModule,RouterModule.forRoot([])]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SettingsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
