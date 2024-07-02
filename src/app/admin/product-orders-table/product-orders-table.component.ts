import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from './order';
import { OrderService } from './order.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-table-complete',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbHighlight,
    NgbdSortableHeader,
    NgbPaginationModule,
    CommonModule,
  ],
  templateUrl: './product-orders-table.component.html',
  styleUrl: './product-orders-table.component.css',
  providers: [OrderService, DecimalPipe],
})
export class ProductOrdersTableComponent {
  countries$: Observable<Order[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: OrderService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Processing':
        return 'status-paid';
      case 'Shipped':
        return 'status-pending';
      case 'Delivered':
        return 'status-shipped';
      case 'Cancelled':
        return 'status-delivered';
      default:
        return '';
    }
  }
  

  trackById(index: number, item: any) {
    return item.id; // Adjust this based on your unique identifier for each order
  }
}
