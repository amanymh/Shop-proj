import { Component,  Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product')product : Product;

@Input('shopping-cart') shoppingCart;

  constructor(private cardService:ShoppingCartService) { }

 
  addToCart(){
   this.cardService.addToCart(this.product);

  }
  removeFromCart(){
    this.cardService.removeFromCart(this.product);
  }
 

}
