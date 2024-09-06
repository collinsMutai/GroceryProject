import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../website/product.service'; // Adjust the path as necessary
import { Item } from '../../website/Product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  selectedItem: Item | null = null;
  quantity = 1;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService // Inject ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const itemId = params.get('id');
      if (itemId) {
        this.loadItemDetails(itemId);
      } else {
        this.router.navigate(['/']); // Redirect if no item ID
      }
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

  loadItemDetails(itemId: string): void {
    this.productService.getProductById(itemId).subscribe({
      next: (item) => {
        this.selectedItem = item;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.router.navigate(['/']); // Redirect on error
      },
    });
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

  addToCart(): void {
    if (this.selectedItem) {
      const cartItem = {
        itemId: this.selectedItem.id,
        quantity: this.quantity,
        price: this.selectedItem.price,
      };

      // Call the ProductService to add or update the item in the cart
      this.productService.addtoCart(cartItem);

      console.log(
        `${this.quantity} unit(s) of ${this.selectedItem.name} added to cart.`
      );
    } else {
      console.error('No item selected.');
    }
  }
}
