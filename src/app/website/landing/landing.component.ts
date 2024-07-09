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
  cartItems!: any;
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

  getCartData(id: number) {
    this.productService.getCart(id).subscribe((res) => {
      this.cartItems = res;
    });
  }
  removeCartItem(CartId: any) {
    this.productService.deleteCartItem(CartId).subscribe((res) => {
      this.getCartData(1);
    });
  }
}
