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
    this.fetchProducts('vegetables');
    this.fetchProducts('fruits');
    this.fetchProducts('spices');
    this.fetchProducts('meats');
    this.fetchProducts('dairys');
  }

  fetchProducts(category: string): void {
    this.productService.getAllProducts().subscribe((res) => {
      const products = res.filter(
        (product: Item) => product.category === category
      );
      const imagesWithNames = products.map((product: Item) => ({
        imageUrl: product.imageUrl,
        name: product.name,
      }));

      switch (category) {
        case 'vegetables':
          this.vegetableImagesWithNames = imagesWithNames;
          break;
        case 'fruits':
          this.fruitImagesWithNames = imagesWithNames;
          break;
        case 'spices':
          this.spiceImagesWithNames = imagesWithNames;
          break;
        case 'meats':
          this.meatImagesWithNames = imagesWithNames;
          break;
        case 'dairys':
          this.dairyImagesWithNames = imagesWithNames;
          break;
      }

      this.updateChunkSize();
    });
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
      description: 'Fresh and organic avocados from local farms.',
      category: 'Fruits',
      inStock: true,
    };

    this.selectedItems.push(fakeItem);
    this.router.navigate(['products', fakeItem.id], {
      state: { selectedItems: this.selectedItems },
    });
  }
}
