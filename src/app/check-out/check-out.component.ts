import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {}; 
  cart: ShoppingCart;
cartSubscription : Subscription;
userSubscription :Subscription;
userId:string;

  constructor(
    private authService :AuthService,
    private orderService : OrderService,
    private shoppingCartService :ShoppingCartService) { }

 async ngOnInit() {
  let cart$ =await this.shoppingCartService.getCart();
 this.cartSubscription= cart$.subscribe(cart => this.cart = cart);
this.userSubscription= this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  

  placeOrder() {
    let order = {
      userId : this.userId,
      datePlaced : new Date().getTime(),
      shipping : this.shipping,
      items : this.cart.items.map( i => {
        return {
          product :{
            title : i.title,
            imageUrl : i.imageUrl,
            price : i.price
          },
          quantity : i.quantity,
          totalPrice : i.totalPrice
        } })
 };

 this.orderService.storeOrder(order);
  } 
  
  ngOnDestroy(){
this.cartSubscription.unsubscribe();
this.userSubscription.unsubscribe();
  }
}
