import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

import 'owl.carousel';
declare var $: any;

@Component({
  selector: 'app-fruit',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './fruit.component.html',
  styleUrl: './fruit.component.css',
})
export class FruitComponent implements AfterViewInit {
  @ViewChild('owlCarousel2') owlCarousel2!: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => {
      $(this.owlCarousel2.nativeElement).owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        navSpeed: 700,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: true,
        dots: false,
        navText: [
          "<span class='owl-nav-prev'>❮</span>",
          "<span class='owl-nav-next'>❯</span>",
        ],
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          1100: {
            items: 5,
          },
          1400: {
            items: 7,
            loop: false,
          },
        },
      });
    }, 0);
  }
}
