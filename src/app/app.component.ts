import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from './website/product.service';
import { CartItem } from './website/Product';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from './website/footer/footer.component';
import { AuthService } from './auth.service';
declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  totalQuantity: number = 0;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  isRegister: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      userType: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registrationForm = this.fb.group({
      userType: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

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
    this.productService.getCart().subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.calculateTotals();
    });
  }

  openCart() {
    $('#cartModal').modal('show');
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
    this.calculateTotals(); // Update totals after changing quantity
  }

  removeProduct(productId: string): void {
    this.productService.removeFromCart(productId);
  }

  toCheckout() {
    $('#cartModal').modal('hide');
    this.router.navigate(['cart']);
  }

  navigateToCategory(vendor: string) {
    this.router.navigate(['/category'], { queryParams: { vendor } });
  }

  loginHandler() {
    $('#loginModal').modal('show');
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password, userType } = this.loginForm.value;

      this.authService.login(userType, username, password).subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard');
          $('#loginModal').modal('hide');
        },
        error: () => {
          alert('Invalid credentials');
        },
      });
    } else {
      alert('Please fill in all required fields');
    }
  }

  onRegister() {
    if (this.registrationForm.valid) {
      const { username, password, firstName, lastName, userType } =
        this.registrationForm.value;

      this.authService
        .register(userType, { username, password, firstName, lastName })
        .subscribe({
          next: () => {
            alert('Registration successful! You can log in now.');
            this.isRegister = false; // Switch back to login form
          },
          error: (err) => {
            console.error('Registration error:', err);
            alert(
              err.error ? err.error : 'Registration failed. Please try again.'
            );
          },
        });
    } else {
      alert('Please fill in all required fields');
    }
  }

  toggleRegister() {
    this.isRegister = !this.isRegister; // Toggle between login and registration
  }
}
