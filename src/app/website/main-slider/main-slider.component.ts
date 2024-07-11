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
    this.productService.getCart().subscribe((cartItems: any[]) => {
      const existingItem = cartItems.find(
        (item) => item.CustId === 1 && item.ProductId === productId
      );

      if (existingItem) {
        // If the product exists, update its quantity
        const updatedQuantity = existingItem.Quantity + 1;
        const updatedTotal = updatedQuantity * existingItem.productPrice;
        this.updateCartItem(
          existingItem.CartId,
          existingItem.CustId,
          existingItem.ProductName,
          existingItem.ProductId,
          updatedQuantity,
          existingItem.AddedData,
          existingItem.ProductImgUrl,
          existingItem.productPrice,
          updatedTotal
        );
      } else {
        // If the product does not exist, add it to the cart
        const productToAdd = this.products.find(
          (product) => product.id === productId
        );
        if (productToAdd) {
          const obj = {
            CustId: 1,
            ProductName: productToAdd.productName,
            ProductId: productToAdd.id,
            Quantity: 1,
            AddedData: new Date().toISOString(),
            ProductImgUrl: productToAdd.productImage,
            productPrice: productToAdd.productPrice,
            Total: productToAdd.productPrice,
          };
          this.productService.addtoCart(obj).subscribe(() => {
            this.productService.cartUpdated.next(true);
          });
        }
      }
    });
  }

  updateCartItem(
    CartId: any,
    CustId: number,
    ProductName: string,
    ProductId: string,
    newQuantity: number,
    AddedData: string,
    ProductImgUrl: string,
    productPrice: number,
    updatedTotal: number
  ) {
    const obj = {
      CartId: CartId,
      CustId: 1,
      ProductName: ProductName,
      ProductId: ProductId,
      Quantity: newQuantity,
      AddedData: AddedData,
      ProductImgUrl: ProductImgUrl,
      Total: updatedTotal,
    };
    // Fetch the current cart items
    this.productService.getCart().subscribe((cartItems: any[]) => {
      // Find the item in the cart array based on CustId and ProductId
      const existingItem = cartItems.find(
        (item) => item.CustId === CustId && item.ProductId === ProductId
      );

      if (existingItem) {
        // If the item exists, update its quantity
        const updatedItem = {
          ...existingItem,
          Quantity: newQuantity,
          Total: updatedTotal,
        };

        // Call the updateCartItem method in ProductService to update the item
        this.productService
          .updateCartItem(existingItem.id, updatedItem)
          .subscribe(() => {
            // Notify subscribers that the cart has been updated
            this.productService.cartUpdated.next(true);
            // Update local storage if needed
          });
      }
    });
  }
}
