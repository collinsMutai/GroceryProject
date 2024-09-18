import { ActivatedRoute, Router } from '@angular/router';
import { CartItem, Item } from '../Product';
import { ProductService } from '../product.service';
import { combineLatest, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent implements OnInit {
  items: Item[] = [];
  cartItems: CartItem[] = [];
  quantityMap: { [key: string]: number } = {};
  vendor!: string

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.queryParams,
      this.productService.getProductsObservable(),
    ])
      .pipe(
        map(([params, products]) => {
          this.vendor = params['vendor'];
          console.log('vendor', this.vendor);
          return {
            vendor: this.vendor,
            items: this.vendor
              ? products.filter((product) => product.vendor['name'] === this.vendor)
              : products,
          };
        })
      )
      .subscribe(({ items }) => {
        console.log('items', items);
        this.items = items;
        // Initialize quantityMap with default quantities
        this.quantityMap = items.reduce((acc, item) => {
          acc[item._id] = 1; // Default quantity
          return acc;
        }, {} as { [key: string]: number });
        
      });

    // Subscription for cart items
    this.productService.getCart().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) return;

    this.productService
      .updateCartItem(productId, quantity)
      .subscribe((updatedCart) => {
        this.cartItems = updatedCart;
      });
  }

  addToCart(selectedItem: Item): void {
    if (selectedItem) {
      const existingCartItem = this.cartItems.find(
        (item) => item.productId === selectedItem._id
      );
      if (existingCartItem) {
        this.updateQuantity(
          selectedItem._id,
          existingCartItem.quantity + this.quantityMap[selectedItem._id]
        );
      } else {
        const cartItem: CartItem = {
          productId: selectedItem._id,
          quantity: this.quantityMap[selectedItem._id],
          price: selectedItem.price,
          name: selectedItem.name,
          image: selectedItem.image,
          vendor: selectedItem.vendor,
        };
        this.productService
          .addToCart(cartItem, this.quantityMap[selectedItem._id])
          .subscribe((updatedCart) => {
            this.cartItems = updatedCart;
          });
      }
    } else {
      console.error('No item selected.');
    }
  }

  decreaseQuantity(productId: string): void {
    if (this.quantityMap[productId] > 1) {
      this.quantityMap[productId]--;
    }
  }

  increaseQuantity(productId: string): void {
    this.quantityMap[productId]++;
  }
}
