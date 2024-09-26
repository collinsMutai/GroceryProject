import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { ProductService } from '../../website/product.service';
import { Observable, Subscription, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$!: Observable<any[]>;
  currentUser: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to user observable to get current user data
    const userSub = this.authService.user$.subscribe((user) => {
      this.currentUser = user;
      console.log('Current User:', this.currentUser); // Debug: Log current user info

      // If the user exists, fetch vendor-specific products
      if (this.currentUser && this.currentUser._id) {
        this.productService.getAllVendorProducts(this.currentUser._id);
      }
    });

    // Subscribe to the productsSubject to receive product updates
    const productSub = this.productService
      .getProductsObservable()
      .subscribe((products) => {
        this.products$ = of(products); // Corrected: Wrap the array in an observable
        console.log('Products received:', products); // Debug: Log products info
      });

    // Add subscriptions to the array
    this.subscriptions.push(userSub, productSub);
  }

  addProductForm() {
    this.router.navigate(['dashboard/add-product']);
  }

  navigateTo(category: string) {
    this.router.navigate([`/dashboard/category/${category}`]);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
