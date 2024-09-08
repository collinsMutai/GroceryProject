import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'; // Adjust the path as necessary
import { CartItem } from '../Product'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css'], // Corrected styleUrls
})
export class CustomerCartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getCart().subscribe((cartItems) => {
      this.cartItems = cartItems;
      console.log('this.cartItems', this.cartItems);
    });
  }

  calculateSubtotal(price: number, quantity: number): number {
    console.log('price', price, 'quantity', quantity);
    return price * quantity;
  }

  updateQuantity(productId: string, quantity: number): void {
    this.productService.updateCartItem(productId, quantity);
  }

  removeProduct(productId: string): void {
    this.productService.removeFromCart(productId);
  }

  toCheckout() {
    this.router.navigate(['checkout']);
  }
}
