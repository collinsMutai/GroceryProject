import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service'; // Adjust the path as necessary
import { Item, CartItem } from '../Product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  selectedItem: Item | null = null;
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
      const itemId = params.get('id');
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

  loadItemDetails(itemId: string): void {
    this.productService.getProductById(itemId).subscribe({
      next: (item) => {
        if (item) {
          this.selectedItem = item.product;
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
    return this.selectedItem ? this.selectedItem.price * this.quantity : 0;
  }

  addToCart(selectedItem: Item): void {
    if (selectedItem) {
      const cartItem: CartItem = {
        productId: selectedItem._id,
        quantity: this.quantity,
        price: selectedItem.price,
        name: selectedItem.name,
        image: selectedItem.image,
        vendor: selectedItem.vendor,
      };
      this.productService.addToCart(cartItem, this.quantity);
    } else {
      console.error('No item selected.');
    }
  }
}
