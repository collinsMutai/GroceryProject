import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  activeTab: string = 'home';
  cartItems: any[] = [];
  subtotal: number = 0;
  totalQuantity: number = 0;

  constructor(private productService: ProductService) {
    this.getCartData(1);
    this.productService.cartUpdated.subscribe((res: boolean) => {
      if (res) {
        this.getCartData(1);
      }
    });
  }

  setActive(tab: string) {
    this.activeTab = tab;
  }

  getCartData(CustId: number) {
    this.productService.getCart().subscribe((data) => {
      this.cartItems = data.cartItems;
      this.subtotal = data.subtotal;
      this.totalQuantity = data.totalQuantity;
    });
  }

  updateCartItemQuantity(item: any, newQuantity: number) {
    const updatedItem = { ...item, Quantity: newQuantity };

    this.productService
      .updateCartItem(updatedItem.id, updatedItem)
      .subscribe(() => {
        this.productService.cartUpdated.next(true);
      });
  }
  subtractCartItemQuantity(item: any) {
    const updatedQuantity = item.Quantity - 1;

    if (updatedQuantity >= 1) {
      const updatedItem = { ...item, Quantity: updatedQuantity };
      updatedItem.Total = updatedItem.productPrice * updatedQuantity;

      this.productService
        .updateCartItem(updatedItem.id, updatedItem)
        .subscribe(() => {
          this.productService.cartUpdated.next(true);
        });
    } else if (updatedQuantity === 0) {
      this.removeCartItem(item.id);
    } else {
      console.log('Quantity cannot be less than 0.');
    }
  }

  incrementCartItemQuantity(item: any) {
    const updatedQuantity = item.Quantity + 1;
    const updatedItem = { ...item, Quantity: updatedQuantity };
    updatedItem.Total = updatedItem.productPrice * updatedQuantity;

    this.productService
      .updateCartItem(updatedItem.id, updatedItem)
      .subscribe(() => {
        this.productService.cartUpdated.next(true);
      });
  }

  removeCartItem(CartId: string) {
    this.productService.deleteCartItem(CartId).subscribe(() => {
      this.productService.cartUpdated.next(true);
    });
  }
}
