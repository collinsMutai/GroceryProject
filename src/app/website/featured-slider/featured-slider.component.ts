import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

import 'owl.carousel';
import { ProductService } from '../product.service';
import { VegetableComponent } from '../vegetable/vegetable.component';
import { FruitComponent } from '../fruit/fruit.component';

declare var $: any;

@Component({
  standalone: true,
  selector: 'app-featured-slider',
  templateUrl: './featured-slider.component.html',
  styleUrls: ['./featured-slider.component.css'],
  imports: [CarouselModule, CommonModule, VegetableComponent, FruitComponent],
})
export class FeaturedSliderComponent implements AfterViewInit, OnInit {
  products: any[] = [];

  @ViewChild('owlCarousel') owlCarousel!: ElementRef;

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        navSpeed: 700,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          1100: {
            items: 3,
          },
          1400: {
            items: 4,
            loop: false,
          },
        },
      });
    }, 0);
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res;
      console.log(this.products);
    });
  }
}




