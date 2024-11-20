import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  products = [
    {
      name: 'Product 1',
      price: 19.99,
      date: '2023-11-01',
      image:
        'https://greenspoon.co.ke/wp-content/uploads/2021/12/Greenspoon-Flat-Parsley-Mlango-Farm1-720x480.jpg',
    },
    {
      name: 'Product 2',
      price: 29.99,
      date: '2023-10-20',
      image:
        'https://greenspoon.co.ke/wp-content/uploads/2021/12/Greenspoon-Flat-Parsley-Mlango-Farm1-720x480.jpg',
    },
    {
      name: 'Product 3',
      price: 39.99,
      date: '2023-10-15',
      image:
        'https://greenspoon.co.ke/wp-content/uploads/2021/12/Greenspoon-Flat-Parsley-Mlango-Farm1-720x480.jpg',
    },
  ];

  selectedFilter = 'default';

  filteredProducts = [...this.products];

  applyFilter() {
    let sortedProducts = [...this.products];

    switch (this.selectedFilter) {
      case 'priceAsc':
        sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProducts = sortedProducts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case 'oldest':
        sortedProducts = sortedProducts.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      default:
        break;
    }

    this.filteredProducts = sortedProducts;
  }
}
