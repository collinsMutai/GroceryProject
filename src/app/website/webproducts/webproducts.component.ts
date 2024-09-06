import { Component, HostListener, OnInit } from '@angular/core';
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

  vegetableImagesWithNames: { imageUrl: string; name: string }[] = [];
  fruitImagesWithNames: { imageUrl: string; name: string }[] = [];
  spiceImagesWithNames: { imageUrl: string; name: string }[] = [];
  meatImagesWithNames: { imageUrl: string; name: string }[] = [];
  dairyImagesWithNames: { imageUrl: string; name: string }[] = [];

  chunkSizes = {
    vegetables: 7,
    fruits: 7,
    spices: 7,
    meats: 7,
    dairies: 7,
  };

  selectedItems: Item[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    // Subscribe to product updates
    this.productService.getProductsObservable().subscribe((products) => {
      console.log('Products updated:', products); // Log to check data
      this.updateProductList();
    });

    // Initialize chunk sizes based on screen size
    this.updateChunkSize();
  }

  private updateProductList(): void {
    // Access products from BehaviorSubject and log
    const allProducts = this.productService.getProducts();
    console.log('Products in component:', allProducts); // Log products to check data

    if (allProducts.length > 0) {
      this.filterProductsByCategory(allProducts);
    } else {
      console.log('No products available.'); // Log if no products are available
    }
  }

  filterProductsByCategory(products: Item[]): void {
    this.vegetableImagesWithNames = this.getImagesWithNames(
      products.filter((product) => product.category === 'vegetables')
    );
    this.fruitImagesWithNames = this.getImagesWithNames(
      products.filter((product) => product.category === 'fruits')
    );
    this.spiceImagesWithNames = this.getImagesWithNames(
      products.filter((product) => product.category === 'spices')
    );
    this.meatImagesWithNames = this.getImagesWithNames(
      products.filter((product) => product.category === 'meats')
    );
    this.dairyImagesWithNames = this.getImagesWithNames(
      products.filter((product) => product.category === 'dairies')
    );

    this.updateChunkSize();
  }

  getImagesWithNames(products: Item[]): { id: string, imageUrl: string; name: string }[] {
    return products.map((product) => ({
      id: product.id,
      imageUrl: product.imageUrl,
      name: product.name,
    }));
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateChunkSize();
  }

  updateChunkSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 320) {
      this.setChunkSize(2);
    } else if (screenWidth <= 425) {
      this.setChunkSize(3);
    } else if (screenWidth <= 768) {
      this.setChunkSize(4);
    } else if (screenWidth <= 1024) {
      this.setChunkSize(5);
    } else {
      this.setChunkSize(7);
    }
  }

  setChunkSize(size: number): void {
    this.chunkSizes = {
      vegetables: size,
      fruits: size,
      spices: size,
      meats: size,
      dairies: size,
    };
  }

  goToCart(item: Item): void {
    const fakeItem: Item = {
      id: '123abc',
      name: 'Organic Avocado',
      imageUrl: 'https://example.com/images/organic-avocado.jpg',
      unitPrice500g: 2.99,
      unitPriceKg: 5.49,
      price: 4.99,
      description: 'Fresh and organic avocados from local farms.',
      category: 'Fruits',
      inStock: true,
    };
console.log('item', item);

    this.selectedItems.push(item);
    this.router.navigate(['products', item.id], {
      state: { selectedItems: this.selectedItems },
    });
  }
}
