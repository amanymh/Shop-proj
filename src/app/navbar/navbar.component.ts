import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  inputs: ["fav"]
})
export class NavbarComponent implements OnInit {
appUser : AppUser;
cart$ : Observable<ShoppingCart>;

  constructor(public authService :AuthService
     , private shoppingCartService :ShoppingCartService) {
 
   }
async ngOnInit(){
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  this. cart$ =await  this.shoppingCartService.getCart() ;
  
 }

  logout(){
   this.authService.logout();
  }
 
}
