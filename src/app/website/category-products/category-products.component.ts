import { ActivatedRoute, Router } from '@angular/router';
import { CartItem, Item } from '../Product';
import { ProductService } from '../product.service';
import { combineLatest, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  category!: string;
  user: any = null;
  searchTerm: string = '';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  // Computed property for paginated items
  get paginatedItems(): Item[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // For determining the number of pages
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to user changes
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.loadProducts();
    });

    // Load products initially
    this.loadProducts();
  }

  loadProducts(): void {
    combineLatest([
      this.route.params,
      this.productService.getProductsObservable(),
    ])
      .pipe(
        map(([params, products]) => {
          this.category = params['category'];
          const filteredItems = this.category
            ? products.filter(
                (product) =>
                  product.category === this.category &&
                  product.vendor?.['_id'] === this.user?._id
              )
            : products;
          this.items = filteredItems;
          this.filteredItems = filteredItems;
        })
      )
      .subscribe();
  }

  filterItems(): void {
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  updateProduct(product: Item): void {
    this.router.navigate(['/dashboard/product', product._id]);
  }

  deleteProduct(_id: string): void {
    this.productService.deleteProduct(_id);
    this.loadProducts();
  }
}
