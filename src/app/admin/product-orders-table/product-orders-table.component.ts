import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

interface Country {
  id?: number;
  payment_status: string;
  order_status: string;
  date: string;
  total: number;
}
const COUNTRIES: Country[] = [
  {
    payment_status: 'Paid',
    order_status: 'Completed',
    date: '24/6/24',
    total: 87657,
  },
  {
    payment_status: 'Paid',
    order_status: 'Completed',
    date: '24/6/24',
    total: 87657,
  },
  {
    payment_status: 'Paid',
    order_status: 'Completed',
    date: '24/6/24',
    total: 87657,
  },
  {
    payment_status: 'Paid',
    order_status: 'Completed',
    date: '24/6/24',
    total: 87657,
  },
  {
    payment_status: 'Paid',
    order_status: 'Completed',
    date: '24/6/24',
    total: 87657,
  },
];
@Component({
  selector: 'app-product-orders-table',
  standalone: true,
  imports: [FormsModule, NgbPaginationModule, NgbTypeaheadModule, DecimalPipe],
  templateUrl: './product-orders-table.component.html',
  styleUrl: './product-orders-table.component.css',
})
export class ProductOrdersTableComponent {
  page = 1;
  pageSize = 4;
  collectionSize = COUNTRIES.length;
  countries!: Country[];

  constructor() {
    this.refreshCountries();
  }
  refreshCountries() {
    this.countries = COUNTRIES.map((country, i) => ({
      id: i + 1,
      ...country,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
}
