import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './website/footer/footer.component';
import { Subscription } from 'rxjs';
import { ProductService } from './website/product.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CartItem } from './website/Product';
declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  activeTab: string = 'home';
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  totalQuantity: number = 0;
  private cartSubscription: Subscription = new Subscription();
  title: any;

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
    this.cartSubscription = this.productService
      .getCart()
      .subscribe((cartItems) => {
        this.cartItems = cartItems;
        this.calculateTotals();
      });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  setActive(tab: string) {
    this.activeTab = tab;
  }

  openCart() {
    //  this.router.navigate(['cart']);
    if (this.cartItems.length === 0) {
     
      console.log('Cart is empty.');
    } else {
      console.log('this.cartItems', this.cartItems);
      
      $('#cartModal').modal('show');
    }
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

  updateQuantity(productId: string, quantity: number): void {
    this.productService.updateCartItem(productId, quantity);
  }

  removeProduct(productId: string): void {
    this.productService.removeFromCart(productId);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toCheckout() {
     $('#cartModal').modal('hide');
    this.router.navigate(['cart']);
  }
}
