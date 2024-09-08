import {
  AfterViewInit,
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { ImageOverlayComponent } from '../image-overlay/image-overlay.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    CommonModule,
    RouterLink,
    ImageOverlayComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit, AfterViewInit {
  activeTab: string = 'home';
  cartItems: any[] = [];
  subtotal: number = 0;
  totalQuantity: number = 0;

  private cartSubscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('scrollreveal').then((ScrollReveal) => {
        const scrollRevealOption = {
          distance: '50px',
          origin: 'bottom',
          duration: 1000,
        };
        ScrollReveal.default().reveal('.', {
          ...scrollRevealOption,
          origin: 'left',
        });
      });
    }
  }

  ngOnInit(): void {
    // Subscribe to cart data changes
    this.cartSubscription = this.productService
      .getCartObservable()
      .subscribe((cartData) => {
        this.cartItems = cartData.cartItems;
        this.subtotal = cartData.subtotal;
        this.totalQuantity = cartData.totalQuantity;
      });

    // You can use Angular's change detection strategy or manually call this method where appropriate
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to avoid memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  setActive(tab: string) {
    this.activeTab = tab;
  }

  updateCartItemQuantity(item: any, newQuantity: number) {
    const updatedItem = { ...item, quantity: newQuantity }; // Changed property to 'quantity' as per standard convention
    updatedItem.Total = updatedItem.unitPrice500g * newQuantity; // Adjust property if needed

    this.productService.updateCartItem(updatedItem.id, updatedItem);
  }

  subtractCartItemQuantity(item: any) {
    const updatedQuantity = item.quantity - 1; // Changed property to 'quantity'

    if (updatedQuantity >= 1) {
      const updatedItem = { ...item, quantity: updatedQuantity }; // Changed property to 'quantity'
      updatedItem.Total = updatedItem.unitPrice500g * updatedQuantity; // Adjust property if needed

      this.productService.updateCartItem(updatedItem.id, updatedItem);
    } else if (updatedQuantity === 0) {
      this.removeCartItem(item.id);
    } else {
      console.log('Quantity cannot be less than 0.');
    }
  }

  incrementCartItemQuantity(item: any) {
    const updatedQuantity = item.quantity + 1; // Changed property to 'quantity'
    const updatedItem = { ...item, quantity: updatedQuantity }; // Changed property to 'quantity'
    updatedItem.Total = updatedItem.unitPrice500g * updatedQuantity; // Adjust property if needed

    this.productService.updateCartItem(updatedItem.id, updatedItem);
  }

  removeCartItem(cartId: string) {
    this.productService.removeFromCart(cartId);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
