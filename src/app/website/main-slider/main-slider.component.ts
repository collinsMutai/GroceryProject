import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductService } from '../product.service';

import 'owl.carousel';
declare var $: any;

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent implements AfterViewInit, OnInit {
  @Input() title!: string;
  products: any[] = [];
  featuredProduct: any[] = [];

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
  addToCart(id: any){
    const obj = {
      "CartId": 0,
      "CustId": 0,
      "ProductId":0,
      "Quantity": 0,
      "AddedData": new Date()
    }
    this.productService.addtoCart(obj).subscribe((res:any)=>{

    })

  }
}