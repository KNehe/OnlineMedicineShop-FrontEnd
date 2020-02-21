import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../app.module';
import { RouterModule, Router } from '@angular/router';
import { MdbIconComponent } from 'angular-bootstrap-md';
import { AuthenticationService } from '../Services/authentication.service';


describe('LoginComponent', () => {

//   let authService: AuthenticationService;
//   let router: Router;

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent,FaIconComponent,MdbIconComponent],
      providers:[AppModule],
      imports:[FormsModule, HttpClientModule,RouterModule.forRoot([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   beforeEach(()=>{
//       component = new LoginComponent(authService,router);
//   });

  it('should return loginViewModel data', () =>{
    component.login();

    expect(component.loginViewModel).not.toBe(null);

    expect(component.loginViewModel).not.toBeNull();

    expect(component.loginViewModel).not.toEqual(null)
  });


});
