import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCartComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    DataTableModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      
      {path : '' , component : ProductsComponent},
      {path : 'products' , component : ProductsComponent},
      {path : 'shopping-cart' , component : ShoppingCartComponent},
      {path : 'login' , component : LoginComponent},

      {path : 'check-out' , component : CheckOutComponent, canActivate:[AuthGuard]},
      {path : 'order-success' , component : OrderSuccessComponent , canActivate:[AuthGuard]},
      {path : "my/orders" , component : MyOrdersComponent , canActivate:[AuthGuard]},
    
     
       {path : 'admin/products/new' ,
       component : ProductFormComponent 
       , canActivate:[AuthGuard,AdminAuthGuard]},


       {path : 'admin/products/:id' ,
       component : ProductFormComponent 
       , canActivate:[AuthGuard,AdminAuthGuard]},

       {path : 'admin/products' ,
       component : AdminProductsComponent 
       , canActivate:[AuthGuard,AdminAuthGuard]},

      {path : 'admin/orders' , 
      component : AdminOrdersComponent ,
       canActivate:[AuthGuard,AdminAuthGuard]},
       
    ])
  ],
  providers: [AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    OrderService,
    ShoppingCartService,
    ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
