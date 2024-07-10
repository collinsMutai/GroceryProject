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
  addToCart(productId: any) {
    // Check if the product already exists in the cart
    this.productService.getCart(1).subscribe((cartItems: any[]) => {
      const existingItem = cartItems.find(
        (item) => item.ProductId === productId
      );

      if (existingItem) {
        // If the product exists, update its quantity
        const updatedQuantity = existingItem.Quantity + 1;
        this.updateCartItem(
          existingItem.id,
          updatedQuantity,
          existingItem.ProductName,
          existingItem.ProductImgUrl
        );
      } else {
        // If the product does not exist, add it to the cart
        const productToAdd = this.products.find(
          (product) => product.id === productId
        );
        if (productToAdd) {
          const obj = {
            CartId: 0,
            CustId: 1,
            ProductName: productToAdd.productName,
            ProductId: productToAdd.id,
            Quantity: 1,
            AddedData: new Date(),
            ProductImgUrl: productToAdd.productImage,
          };
          this.productService.addtoCart(obj).subscribe(() => {
            this.productService.cartUpdated.next(true);
          });
        }
      }
    });
  }

  updateCartItem(
    cartItemId: any,
    newQuantity: number,
    ProductName: string,
    ProductImgUrl: string) {
    const obj = {
      Quantity: newQuantity,
      ProductName: ProductName,
      ProductImgUrl: ProductImgUrl,
    };
    this.productService.updateCartItem(cartItemId, obj).subscribe(() => {
      this.productService.cartUpdated.next(true);
    });
  }
}
