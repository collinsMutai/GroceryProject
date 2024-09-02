import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import 'owl.carousel';
import { Router, RouterModule } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-vegetable',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vegetable.component.html',
  styleUrls: ['./vegetable.component.css'],
})
export class VegetableComponent implements AfterViewInit, OnInit {
  vegetables: any[] = [];

  ngOnInit(): void {
    this.vegetables = [
      {
        name: 'Red Onion',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/71AM8cSg+7L.AC_SL240_.jpg',
      },
      {
        name: 'Asparagus Green',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/71rpY2GtFHL.AC_SL240_.jpg',
      },
      {
        name: 'Zucchini Squash',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/71GxrCR+gLL.AC_SL240_.jpg',
      },
      {
        name: 'Plum Roma Tomato',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/71xjZONKSIL.AC_SL240_.jpg',
      },
      {
        name: 'Broccoli Crowns',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/81JWj-cXxQL.AC_SL240_.jpg',
      },
      {
        name: 'Green Bell Pepper',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToRhrzg0_RX2DNu3WIXvRp6jSP7LP7S18yyQ&s',
      },
      {
        name: 'Carrots',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr3bM_dBaWJMdq4AIecvVNTp_K6wR3XVm6lw&s',
      },
      {
        name: 'Cauliflower',
        imageUrl:
          'https://static.vecteezy.com/system/resources/previews/029/720/704/non_2x/cauliflower-transparent-background-png.png',
      },
      {
        name: 'Spinach',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9J874t5hj-JnGP5IT1Jd89msWpHKb0bL5Vg&s',
      },
      {
        name: 'Kale',
        imageUrl:
          'https://purepng.com/public/uploads/large/purepng.com-kale-bundlevegetables-kale-leaf-cabbage-green-leaves-borecole-941524683046rvwcj.png',
      },
      { name: 'Cabbage', imageUrl: 'https://pngimg.com/d/cabbage_PNG8804.png' },
      {
        name: 'Lettuce',
        imageUrl:
          'https://i.pinimg.com/originals/60/16/91/6016911336b4930bb9eda15b99ffad36.png',
      },
      {
        name: 'Sweet Potatoes',
        imageUrl:
          'https://static.vecteezy.com/system/resources/previews/029/712/252/original/sweet-potato-transparent-background-png.png',
      },
      {
        name: 'Celery',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTfGGxcJ79G0PvHdw1m7L9ucXSNMX6_HZqXw&s',
      },
      {
        name: 'Cucumbers',
        imageUrl:
          'https://www.pngall.com/wp-content/uploads/2016/04/Cucumber-PNG-HD.png',
      },
      {
        name: 'Eggplant',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HUPGE0lD14wLE0Gv-FFFG3R8o-g_6_Z1KA&s',
      },
      {
        name: 'Radish',
        imageUrl:
          'https://purepng.com/public/uploads/large/purepng.com-radishvegetables-radish-fodder-radish-941524712345m1qre.png',
      },
      {
        name: 'Beets',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRs_hWteGqH5RSUI0TjcRMgNP64QpEKvUxWA&s',
      },
      {
        name: 'Pumpkin',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlb8dTjBW78N3SXb1X_P76KamYKPKyBxPI1A&s',
      },
      {
        name: 'Butternut Squash',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpF_XoBsOL4NL5Df-Y-Q_ovNo7aebBAVMYSA&s',
      },
      {
        name: 'Tomatoes',
        imageUrl:
          'https://www.transparentpng.com/download/tomato/PSJAVT-tomato-picture.png',
      },
      {
        name: 'Green Beans',
        imageUrl:
          'https://images.everydayhealth.com/images/diet-nutrition/potential-health-benefits-of-green-beans-1440x810.jpg',
      },
      {
        name: 'Brussels Sprouts',
        imageUrl:
          'https://purepng.com/public/uploads/large/purepng.com-brussels-sproutsvegetables-brussels-sprouts-941524719390ewwex.png',
      },
      {
        name: 'Artichoke',
        imageUrl:
          'https://www.thespruceeats.com/thmb/Z9vy2vlSdm2c-g7vlnm2_MPAEec=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-157315654-2b78b5edd25e414ebfa0301aa676018e.jpg',
      },
    ];

    
  }
  @ViewChild('owlCarousel3', { static: true }) owlCarousel3!: ElementRef;

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

  constructor(private router: Router) {}
  goToCart(vegetable: any) {
    this.router.navigate(['/Cart'], {
      state: { selectedVegetable: vegetable },
    });
  }
}
