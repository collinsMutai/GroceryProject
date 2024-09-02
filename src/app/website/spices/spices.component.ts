import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'owl.carousel';
import { Router, RouterModule } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-spices',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './spices.component.html',
  styleUrl: './spices.component.css'
})
export class SpicesComponent implements AfterViewInit {
  @ViewChild('owlCarousel3', { static: true }) owlCarousel3!: ElementRef;

   spices = [
    {
      name: 'Cinnamon',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Cinnamomum_verum_spices.jpg/1200px-Cinnamomum_verum_spices.jpg',
      unitPrice: 588.00,
      unitPriceKg: 1176.00,
      description: 'FRESH CINNAMON',
      inStock: true
    },
    {
      name: 'Turmeric',
      imageUrl: 'https://www.naatigrains.com/image/cache/catalog/naatigrains-products/NG121/pure-turmeric-powder-hand-processed-solar-dried-stone-order-now-online-organic-grinded-by-naati-grains-1000x1000.jpg',
    },
    {
      name: 'Ginger',
      imageUrl: 'https://aggie-horticulture.tamu.edu/wp-content/uploads/sites/10/2011/10/ginger.jpg',
    },
    {
      name: 'Cumin',
      imageUrl: 'https://t3.ftcdn.net/jpg/01/95/20/82/360_F_195208265_hcwcxDwqtH41uKAnJ0gNZghjriJytbnR.jpg',
    },
    {
      name: 'Paprika',
      imageUrl: 'https://thumbs.dreamstime.com/b/paprika-16685032.jpg',
    },
    {
      name: 'Cardamom',
      imageUrl: 'https://harkola.online/wp-content/uploads/2017/01/Cardamom.jpg',
    },
    {
      name: 'Clove',
      imageUrl: 'https://t3.ftcdn.net/jpg/00/46/43/38/360_F_46433885_pyLrmyDWOdEjR1TgqHQcFPfqUWi7J3By.jpg',
    },
    {
      name: 'Nutmeg',
      imageUrl: 'https://cdn.britannica.com/77/170777-050-3A754B3D/Nutmeg-seeds-ground-spice.jpg',
    },
    {
      name: 'Saffron',
      imageUrl: 'https://perfarmersglobal.in/wp-content/uploads/2023/10/Saffron.jpg',
    },
    // {
    //   name: 'Coriander',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Black Pepper',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Fenugreek',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Fennel',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Mustard Seeds',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Bay Leaf',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Star Anise',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Aniseed',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Allspice',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Mace',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Sumac',
    //   imageUrl: '',
    // }
  ];
  
constructor(private router: Router){}
  ngAfterViewInit(): void {
    setTimeout(() => {
      $(this.owlCarousel3.nativeElement).owlCarousel({
        loop: true,
        margin: 10,
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

      // Add animation class after initialization
      this.owlCarousel3.nativeElement.classList.add('animate');
    }, 0);
  }
  goToCart(spice: any) {
    this.router.navigate(['/Cart'], { state: { selectedSpice: spice } });
  }
}
