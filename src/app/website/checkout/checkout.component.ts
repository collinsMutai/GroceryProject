import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CartItem } from '../Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  totalQuantity: number = 0;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getCart().subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.calculateTotals();
    });
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
  placeOrder() {}
}
