import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
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
  selectedUnit = 'PER 500G';
  quantity = 1;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute
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

  loadItemDetails(itemId: string) {
    // Use a fake product for demonstration purposes
    const fakeProducts: Item[] = [
      {
        id: '123abc',
        name: 'Organic Avocado',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/81LKLCmdAQL.AC_SL240_.jpg',
        unitPrice500g: 2.99,
        unitPriceKg: 5.49,
        description: 'Fresh and organic avocados from local farms.',
        category: 'Fruits',
        inStock: true,
      },

      {
        id: '1',
        name: 'Fake Product 1',
        imageUrl: 'https://via.placeholder.com/150',
        unitPrice500g: 100,
        unitPriceKg: 180,
        description:
          'This is a fake product 1 description for testing purposes.',
        inStock: true,
        category: 'fruits',
      },
      {
        id: '2',
        name: 'Fake Product 2',
        imageUrl: 'https://via.placeholder.com/150',
        unitPrice500g: 120,
        unitPriceKg: 200,
        description:
          'This is a fake product 2 description for testing purposes.',
        inStock: true,
        category: 'meats',
      },
    ];

    this.selectedItem =
      fakeProducts.find((product) => product.id === itemId) || null;
  }

  selectUnit(unit: string) {
    this.selectedUnit = unit;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.selectedItem) {
      // Replace with actual cart logic
      console.log(
        `${this.quantity} unit(s) of ${this.selectedItem.name} added to cart.`
      );
    }
  }
}
