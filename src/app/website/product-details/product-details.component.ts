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
  carousel_data: any[] = [
    {
      title: 'Item 1',
      image:
        'https://d16zmt6hgq1jhj.cloudfront.net/product/3043/Fresh%20Tomatoes%20P-Kg.jpg',
      description: 'Item description goes here.',
    },
    {
      title: 'Item 2',
      image:
        'https://d16zmt6hgq1jhj.cloudfront.net/product/1488/Avena%20Vegetable%20Oil%205L.jpg',
      description: 'Item description goes here.',
    },
  ];

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
          'https://d16zmt6hgq1jhj.cloudfront.net/product/9268/Fresh%20Cabbage.jpg',
        vendor: selectedItem.vendor,
      };
      this.productService.addToCart(cartItem, this.quantity);
    } else {
      console.error('No item selected.');
    }
  }
}
