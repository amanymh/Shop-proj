import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
categories$;
product = {};
id;

  constructor(
    private router :Router,
    private route :ActivatedRoute,
    private categoriesService:CategoryService,
  private productServeice : ProductService) {

    this.categories$ = categoriesService.getCategories();

    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id) this.productServeice.getProduct(this.id).subscribe(p => this.product = p);
    console.log(this.product)
    }

  ngOnInit() {
  }

  save(product){
    if(this.id) this.productServeice.update(this.id ,product);
    else  this.productServeice.create(product);
  
  this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm("Are You Sure You Want To Delete This Product?")) return ;
    
  this.productServeice.delete(this.id); 
  this.router.navigate(['/admin/products']);
  }
}
