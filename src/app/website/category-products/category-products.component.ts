import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css',
})
export class CategoryProductsComponent {
  activeCategoryId!: any;
  products: any [] = []
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.activeCategoryId = res.id;
      this.loadProducts()
    });
  }
  loadProducts(){
    this.productService.getProductByCategory(this.activeCategoryId).subscribe((res: any)=>{
      this.products = res
      console.log(this.products);
      
    })
  }
}
