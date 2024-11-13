import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Item } from '../../website/Product';
import { CategorySliderTemplateComponent } from '../category-slider-template/category-slider-template.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-webproducts',
  standalone: true,
  imports: [CategorySliderTemplateComponent, CommonModule],
  templateUrl: './webproducts.component.html',
  styleUrls: ['./webproducts.component.css'],
})
export class WebproductsComponent implements OnInit {
  vegetables: Item[] = [];
  fruits: Item[] = [];
  spices: Item[] = [];
  meats: Item[] = [];
  dairies: Item[] = [];
  allProducts: Item[] = [];

  selectedItems: Item[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res) => {
      console.log('Full API response:', res.message); // Log the full API response
      this.allProducts = res.message;

      // Filter products by category after receiving data
      this.filterProductsByCategory(this.allProducts);
    });
  }

  private filterProductsByCategory(products: Item[]): void {
    console.log('Filtering products:', products); // Log all products

    // Filter for Vegetables
    this.vegetables = products.filter((product:any) => {
      console.log(
        'Checking product category:',
        product.productType.category?.title
      ); // Log category title
      return product.productType.category?.title === 'Vegetables'; // Compare category title
    });

    console.log('Vegetables after filtering:', this.vegetables); // Log filtered vegetables array

    // Filter other categories
    this.fruits = products.filter(
      (product:any) => product.productType.category?.title === 'Fruits'
    );
    console.log('Fruits after filtering:', this.fruits); // Log filtered fruits array

    this.spices = products.filter(
      (product:any) => product.productType.category?.title === 'Spices'
    );
    console.log('Spices after filtering:', this.spices); // Log filtered spices array

    this.meats = products.filter(
      (product:any) => product.productType.category?.title === 'Meats'
    );
    console.log('Meats after filtering:', this.meats); // Log filtered meats array

    this.dairies = products.filter(
      (product:any) => product.productType.category?.title === 'Dairies'
    );
    console.log('Dairies after filtering:', this.dairies); // Log filtered dairies array
  }

  goToCart(item: Item): void {
    console.log('item', item); // Log clicked item
    // Implement cart functionality here
  }
}
