import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { DataTableResource } from 'angular5-data-table';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {
  products : Product[];
  filterdProducts :any[];
  subscription :Subscription;
  tabelResource :DataTableResource<Product>;
  items:Product[]=[];
  itemCount:number;

  constructor(
    
    private productService:ProductService) {
    this.subscription= this.productService.getAll()
    .subscribe( products => {
      this.filterdProducts= this.products = products;
      this.initializedTabel(products);
     
    })
   }


   private initializedTabel(products:Product[]){
        this.tabelResource= new DataTableResource(this.products);
        this.tabelResource.query({offset:0})
        .then(items => this.items = items);
        this.tabelResource.count()
        .then(count=> this.itemCount = count)
   }
   reloadItems(params){
     if(!this.tabelResource) return;

    this.tabelResource.query(params)
    .then(items => this.items = items);
   }
  ngOnInit() {
  }

  filter(query :string){
    this.filterdProducts = (query) ? 
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
     this.initializedTabel(this.filterdProducts);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
