import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CartItem } from '../Product';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderRequest } from '../Product'; // Update your Product import path accordingly

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  totalQuantity: number = 0;
  checkoutForm: FormGroup;

  // Inject ProductService
  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      building: [''],
      city: ['', Validators.required],
      county: ['', Validators.required],
      instructions: [''],
      paymentMethod: ['mpesa', Validators.required],
    });
  }

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
    return price * quantity;
  }

  placeOrder() {
    if (this.checkoutForm.valid) {
      const orderRequest: OrderRequest = {
        items: this.cartItems,
        paymentMethod: this.checkoutForm.get('paymentMethod')?.value,
        customerDetails: this.checkoutForm.value,
        // Optionally include customerId if authenticated
        // customerId: 'authenticatedUserId' // Replace with actual customer ID if applicable
      };

      this.productService.placeOrder(orderRequest).subscribe((response) => {
        if (response) {
          console.log('Order placed successfully:', response);
          this.router.navigate(['checkout-success']);
        } else {
          console.log('Failed to place order');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
