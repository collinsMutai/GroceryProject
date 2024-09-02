// about.component.ts
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit{
  storeName = 'Quickcart';
  foundingYear = '2017';
  founderName = '......';
  address = '......';
  hours = '.......';
  phoneNumber = '......';
  emailAddress = '......';
  socialMediaLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/YourPage' },
    { name: 'Twitter', url: 'https://twitter.com/YourHandle' },
    { name: 'Instagram', url: 'https://www.instagram.com/YourProfile' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('scrollreveal').then((ScrollReveal) => {
        const scrollRevealOption = {
          distance: '50px',
          origin: 'bottom',
          duration: 1000,
        };
       ScrollReveal.default().reveal(".about__image img", {
          ...scrollRevealOption,
          origin: "left",
        });

        ScrollReveal.default().reveal(".about__image-b img", {
          ...scrollRevealOption,
          origin: "right",
        });
        ScrollReveal.default().reveal(".container-a", {
          ...scrollRevealOption,
          origin: "left",
        });
       ScrollReveal.default().reveal(".about__card", {
          duration: 1000,
          interval: 600,
          delay: 500,
        });

     
      });
    }
  }
}
