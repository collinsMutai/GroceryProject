import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../Product';

@Component({
  selector: 'app-category-slider-template',
  templateUrl: './category-slider-template.component.html',
  styleUrls: ['./category-slider-template.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CategorySliderTemplateComponent implements OnInit, OnChanges {
  @Input() items: { imageUrl: string; name: string }[] = [];
  @Input() chunkSize: number = 7;
  @Input() title: string = 'Category Title'; // For dynamic category title

  chunkedItems: Item[][] = [];
  carouselId: string = ''; // New property for dynamic ID

  @Output() itemClick = new EventEmitter<Item>();

  @ViewChild('carouselCategoryControls', { static: true })
  carouselElement!: ElementRef;

  ngOnInit(): void {
    this.updateChunkSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.items.length > 0) {
      this.carouselId = `carousel-${this.title
        .replace(/\s+/g, '-')
        .toLowerCase()}`; // Generate dynamic ID
      this.updateChunkSize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateChunkSize();
  }

  updateChunkSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 320) {
      this.chunkSize = 2;
    } else if (screenWidth <= 425) {
      this.chunkSize = 3;
    } else if (screenWidth <= 768) {
      this.chunkSize = 4;
    } else if (screenWidth <= 1024) {
      this.chunkSize = 5;
    } else {
      this.chunkSize = 7;
    }
    this.chunkedItems = this.chunkArray(this.items, this.chunkSize);
  }

  chunkArray(array: any[], size: number): any[][] {
    const result: any[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  onItemClick(item: Item) {
    this.itemClick.emit(item);
  }
}
