import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import {Router,Routes, RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AllProductsComponent } from './manage-products/all-products/all-products.component';
import { ViewOrdersComponent } from './manage-products/view-orders/view-orders.component';
import { SettingsComponent } from './manage-products/settings/settings.component';
import { AddProductComponent } from './manage-products/add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatButtonModule, MatSnackBarModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCardModule} from '@angular/material';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { GuardGuard } from './Guards/guard.guard';
import { ShoppingCartGuardGuard } from './Guards/shopping-cart-guard.guard';
import { AuthenticationService } from './Services/authentication.service';
import { DeactivateGuard } from './Guards/deactivate.guard';
import { CheckOutComponent } from './check-out/check-out.component';
import { MDBBootstrapModule, MDBModalRef } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomHttpInterceptor } from './Guards/httpInterceptor';
import {DataTablesModule} from 'angular-datatables'
import { ManageProductsService } from './Services/manage-products.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { StatisticsComponent } from './manage-products/statistics/statistics.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProfileComponent } from './profile/profile.component';




const appRoutes:Routes = [
{
  path:'',
  component:HomeComponent,
  pathMatch:'full'
},
{
  path:'manageproducts',
  component:ManageProductsComponent,
  canActivate:[GuardGuard],
  data:{expectedRole:"ADMIN"},
  children:[
    {
      path:'',
      component:StatisticsComponent,
      pathMatch:'full',
      outlet:'rightdiv'
    },
    {
      path:'manageproducts',
      component:AllProductsComponent,
      outlet:'rightdiv'
    },
    {
      path:'vieworders',
      component:ViewOrdersComponent,
      outlet:'rightdiv'
    },
    {
      path:'settings',
      component:SettingsComponent,
      outlet:'rightdiv'
    },
    {
      path:'addProduct',
      component:AddProductComponent,
      outlet:'rightdiv'
    }
  ]
},
{
path:'register',
component:RegisterComponent,
canActivate:[DeactivateGuard]
},
{
  path:'login',
  component:LoginComponent,
  canActivate:[DeactivateGuard]
},
{
  path:'shoppingcart',
  component:ShoppingCartComponent,
  canActivate:[ShoppingCartGuardGuard],//guard applies to  users
  data:{expectedRole:"USER"}
},
{
  path:'checkout',
  component:CheckOutComponent,
  canActivate:[ShoppingCartGuardGuard],
  data:{expectedRole:"USER"}
},
{
  path:'logout',
  component:LoginComponent
},
{
  path:'profile',
  component:ProfileComponent,
  canActivate:[ShoppingCartGuardGuard],
  data:{expectedRole:"USER"}
},
{
  path:'**',
  component:NotFoundComponent
},



];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ManageProductsComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    FooterComponent,
    AllProductsComponent,
    ViewOrdersComponent,
    SettingsComponent,
    AddProductComponent,
    ShoppingCartComponent,
    RegisterComponent,
    CheckOutComponent,
    ConfirmModalComponent,
    EditModalComponent,
    DeleteModalComponent,
    StatisticsComponent,
    ProfileComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(appRoutes,{enableTracing:true}),
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MDBBootstrapModule.forRoot(),
    DataTablesModule,
    FlexLayoutModule
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [
     AuthenticationService,
     GuardGuard, 
     ShoppingCartGuardGuard,
     ManageProductsService,
     {
       provide:HTTP_INTERCEPTORS,
       useClass: CustomHttpInterceptor,
       multi:true
     }
    ],
  bootstrap: [AppComponent],
  entryComponents:[DeleteModalComponent,EditModalComponent,ConfirmModalComponent],
  
})
export class AppModule { }
