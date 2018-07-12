import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
@Input('product')product : Product;
@Input("show-actions") showActions = true;
@Input('shopping-cart') shoppingCart:ShoppingCart;

  constructor(private cardService:ShoppingCartService) { }

  ngOnInit() {
  }
  
  addToCart(){
   this.cardService.addToCart(this.product);

  }
 
  
}
