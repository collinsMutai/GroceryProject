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

  selectedItems: Item[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    
    this.productService.getProductsObservable().subscribe((productsMap) => {
      const productsArray = Array.from(productsMap.values());
      this.filterProductsByCategory(productsArray);
    });

    this.productService.getAllProducts();
  }

  private filterProductsByCategory(products: Item[]): void {
    this.vegetables = products.filter(
      (product) => product.category === 'vegetables'
    );
    this.fruits = products.filter(
      (product) => product.category === 'fruits'
    );
    this.spices = products.filter((product) => product.category === 'spices');
    this.meats = products.filter((product) => product.category === 'meats');
    this.dairies = products.filter((product) => product.category === 'dairies');
  }

  goToCart(item: Item): void {
    console.log('item', item);
  }
}
