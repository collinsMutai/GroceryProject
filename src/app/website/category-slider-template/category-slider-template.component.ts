import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../website/Product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-slider-template',
  templateUrl: './category-slider-template.component.html',
  styleUrls: ['./category-slider-template.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CategorySliderTemplateComponent implements OnChanges, OnInit {
  @Input() items: Item[] = [];
  @Input() title: string = 'Category Title';
  @Input() chunkSize: number = 7; // Added @Input for chunkSize

  chunkedItems: Item[][] = [];
  carouselId: string = ''; // New property for dynamic ID

  @Output() itemClick = new EventEmitter<Item>();

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    // Initialize carouselId based on the title
    this.carouselId = `carousel-${this.title
      .replace(/\s+/g, '-')
      .toLowerCase()}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] || changes['chunkSize']) {
      this.chunkedItems = this.chunkArray(this.items, this.chunkSize);
    }
  }

  chunkArray(array: Item[], size: number): Item[][] {
    const result: Item[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  onItemClick(item: any): void {
    console.log('onItemClick', item);
    this.router.navigate(['products', item._id]);
  }
}
