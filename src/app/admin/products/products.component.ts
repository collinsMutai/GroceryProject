import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [ProductCardComponent],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res;
      console.log(this.products);
    });
  }

  addProductForm() {
    this.router.navigate(['dashboard/add-product']);
  }

  navigateTo(category: string) {
    this.router.navigate([`/${category}`]);
  }
}
