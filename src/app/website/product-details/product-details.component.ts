import { Component, OnInit } from '@angular/core';
import { MainSliderComponent } from '../main-slider/main-slider.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MainSliderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  products: any[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res.products.filter(
        (product: any) => product.featuredProduct === true
      );
      console.log(this.products);
    });
  }
}
