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
import { OrderRequest } from '../Product';
import { AuthService } from '../../auth.service';
declare var $: any;

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
  orderRequest!: any;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
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
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.checkoutForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          address: user.address,
          city: user.city,
          county: user.county,
        });
      }
    });
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
      const transformedItems = this.cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      }));

      this.orderRequest = {
        items: transformedItems,
        customerDetails: {
          firstName: this.checkoutForm.value.firstName,
          lastName: this.checkoutForm.value.lastName,
          phone: this.checkoutForm.value.phone,
          email: this.checkoutForm.value.email,
          address: this.checkoutForm.value.address,
          building: this.checkoutForm.value.building,
          city: this.checkoutForm.value.city,
          county: this.checkoutForm.value.county,
          instructions: this.checkoutForm.value.instructions,
        },
        paymentMethod: this.checkoutForm.value.paymentMethod,
        customerId: '66ebc0e2457f7a52eaa1893a',
        vendorId: '66ebf838c76fa3d6472d790f',
      };
      this.showPaymentModal();
    } else {
      console.log('Form is invalid');
    }
  }

  showPaymentModal() {
    $('#paymentModal').modal('show');
  }

  closePaymentModal() {
    $('#paymentModal').modal('hide');
    if (this.orderRequest) {
      this.productService
        .placeOrder(this.orderRequest)
        .subscribe((response) => {
          if (response) {
            console.log('Order placed successfully:', response);
            this.productService.clearCart();
            this.router.navigate(['checkout-success']);
          } else {
            console.log('Failed to place order');
          }
        });
    }
  }
}
