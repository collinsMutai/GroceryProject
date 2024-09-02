import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-merchant',
  standalone: true,
  imports: [],
  templateUrl: './merchant.component.html',
  styleUrl: './merchant.component.css'
})
export class MerchantComponent implements AfterViewInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('scrollreveal').then((ScrollReveal) => {
        const scrollRevealOption = {
          distance: '50px',
          origin: 'bottom',
          duration: 2000,
        };
        ScrollReveal.default().reveal(".merchant-container img", {
          ...scrollRevealOption,
          origin: "top",
        });
      });
    }
  }
}
