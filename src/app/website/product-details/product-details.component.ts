import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { CommonModule, CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service'; // Adjust the path as necessary
import { Item, CartItem } from '../Product'; // Adjust path as necessary
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  selectedItem: any | null = null;
  quantity = 1;
  private routeSubscription: Subscription = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const itemId = params.get('productId');
      console.log('productId', itemId);

      if (this.isValidItemId(itemId)) {
        this.loadItemDetails(itemId);
      } else {
        console.warn('Invalid item ID:', itemId);
        this.router.navigate(['/']);
      }
    });
  }

  private isValidItemId(itemId: string | null): itemId is string {
    return itemId !== null && /^[a-zA-Z0-9_-]+$/.test(itemId);
  }

  loadItemDetails(productId: string): void {
    this.productService.getProductById(productId).subscribe({
      next: (response: any) => {
        if (response && response.message) {
          this.selectedItem = response.message;
          console.log('this.selectedItem', this.selectedItem);
        } else {
          console.error('Item not found');
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.router.navigate(['/']);
      },
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('scrollreveal').then((ScrollReveal) => {
        const scrollRevealOption = {
          distance: '50px',
          origin: 'bottom',
          duration: 1800,
        };
        ScrollReveal.default().reveal('.image img', {
          ...scrollRevealOption,
          origin: 'left',
        });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getTotalPrice(): number {
    return this.selectedItem
      ? this.selectedItem.pricePerUnit * this.quantity
      : 0;
  }

  addToCart(selectedItem: any): void {
    if (selectedItem) {
      const cartItem: CartItem = {
        _id: selectedItem._id,
        quantity: this.quantity,
        price: selectedItem.price,
        name: selectedItem.name,
        image:
          'data:image/jpeg;base64,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',
        vendor: selectedItem.vendor,
      };
      this.productService.addToCart(cartItem, this.quantity);
    } else {
      console.error('No item selected.');
    }
  }
}
