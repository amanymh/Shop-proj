import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';

import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:Product[] = [];
filteredProducts :Product[] = [];
cart$: Observable <ShoppingCart>;
category:string;

  constructor(
    private route : ActivatedRoute,
    private productService :ProductService,
    private ShoppingCartService :ShoppingCartService
    ) {
  
 }

 async ngOnInit() {
  this. cart$ = await this.ShoppingCartService.getCart();

 this.populateProducts();
 
  }
 
   private populateProducts(){
    this. productService.getAll()
    .pipe(
      switchMap(products => {
      this.products = products;
      return this. route.queryParamMap
       }))
     .subscribe(prams =>{
        this.category = prams.get("category");
        this.applyFilter();
       
  
     });
   }
  private applyFilter(){
    this.filteredProducts= (this.category) ? 
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
