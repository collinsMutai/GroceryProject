import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartItem, Item } from '../Product';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent implements OnInit {
  items: Item[] = []; // Change from Observable to array
  cartItems: CartItem[] = [];
  selectedItem: Item | null = null;
  quantity = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const vendor = params['vendor'];
      this.productService.getProductsObservable().subscribe((products) => {
        console.log('products', products);

        this.items = vendor
          ? products.filter((product) => product.vendor['name'] === vendor)
          : products;
        console.log('this.items', this.items);
      });
    });

    this.productService.getCart().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) return; // Prevent negative or zero quantity
    // this.productService
    //   .updateCartItem(productId, quantity)
    //   .subscribe((updatedCart) => {
    //     this.cartItems = updatedCart;
    //   });
  }

  addToCart(selectedItem: Item): void {
    if (selectedItem) {
      const existingCartItem = this.cartItems.find(
        (item) => item.productId === selectedItem._id
      );

      if (existingCartItem) {
        this.updateQuantity(
          selectedItem._id,
          existingCartItem.quantity + this.quantity
        );
      } else {
        const cartItem: CartItem = {
          productId: selectedItem._id,
          quantity: this.quantity,
          price: selectedItem.price,
          name: selectedItem.name,
          image: selectedItem.image,
          vendor: selectedItem.vendor,
        };
        // this.productService
        //   .addToCart(cartItem, this.quantity)
        //   .subscribe((updatedCart) => {
        //     this.cartItems = updatedCart;
        //   });
      }
    } else {
      console.error('No item selected.');
    }
  }
}
