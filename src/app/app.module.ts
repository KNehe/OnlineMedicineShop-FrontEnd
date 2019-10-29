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
import {HttpClientModule} from '@angular/common/http';
import { AllProductsComponent } from './manage-products/all-products/all-products.component';
import { ViewOrdersComponent } from './manage-products/view-orders/view-orders.component';
import { SettingsComponent } from './manage-products/settings/settings.component';
import { AddProductComponent } from './manage-products/add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatButtonModule, MatSnackBarModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatSuffix } from '@angular/material';
import { EditDialogComponent } from './manage-products/edit-dialog/edit-dialog.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome'



const appRoutes:Routes = [
{
  path:'',
  component:HomeComponent,
  pathMatch:'full'
},
{
  path:'manageproducts',
  component:ManageProductsComponent,
  children:[
    {
      path:'',
      component:AllProductsComponent,
      pathMatch:'full',
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
component:RegisterComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'shoppingcart',
  component:ShoppingCartComponent
},
{
  path:'logout',
  component:LoginComponent
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
    DialogComponent,
    EditDialogComponent,
    ShoppingCartComponent,
    RegisterComponent
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
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent,EditDialogComponent],
  
})
export class AppModule { }
