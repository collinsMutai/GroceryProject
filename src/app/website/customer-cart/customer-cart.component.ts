import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'; // Adjust the path as necessary
import { CartItem } from '../Product'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css'], 
})
export class CustomerCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  totalQuantity: number = 0;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // this.productService.getCart().subscribe((cartItems) => {
    //   this.cartItems = cartItems;
    //    this.calculateTotals();
    // });
  }
  calculateTotals() {
    this.totalQuantity = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.subtotal = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
