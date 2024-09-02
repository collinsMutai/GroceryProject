import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'owl.carousel';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-meat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meat.component.html',
  styleUrls: ['./meat.component.css'],
})
export class MeatComponent implements AfterViewInit {
  @ViewChild('owlCarousel3', { static: true }) owlCarousel3!: ElementRef;

  meats = [
    {
      name: 'Chicken Breast',
      imageUrl: 'https://png.pngtree.com/png-vector/20231115/ourmid/pngtree-raw-chicken-breast-fillets-food-png-image_10601732.png',
    },
    {
      name: 'Chicken Thighs',
      imageUrl: 'https://png.pngtree.com/png-vector/20240511/ourmid/pngtree-topdown-view-of-chicken-meat-wrapped-in-paper-packaging-on-antique-png-image_12398257.png',
    },
    {
      name: 'Whole Chicken',
      imageUrl: 'https://png.pngtree.com/png-clipart/20240213/original/pngtree-raw-chicken-on-a-white-shopping-tray-with-photo-png-image_14304802.png',
    },
    {
      name: 'Beef Steak',
      imageUrl: 'https://png.pngtree.com/png-vector/20240603/ourmid/pngtree-beef-meat-packaging-steak-png-image_12608610.png',
    },
    {
      name: 'Ground Beef',
      imageUrl: 'https://png.pngtree.com/png-vector/20240515/ourmid/pngtree-minced-meat-in-a-plastic-tray-ground-pork-or-beef-in-png-image_12467845.png',
    },
    {
      name: 'Pork Chops',
      imageUrl: 'https://png.pngtree.com/png-vector/20231222/ourmid/pngtree-raw-fillet-chop-png-image_11181370.png',
    },
    {
      name: 'Pork Belly',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/045/912/330/non_2x/freshly-sliced-raw-pork-belly-ready-for-cooking-cut-out-stock-png.png',
    },
    {
      name: 'Bacon',
      imageUrl: 'https://www.embutidoscarchelejo.com/wp-content/uploads/2022/05/1171-_PANCETA_CURADA.png',
    },
    {
      name: 'Lamb Chops',
      imageUrl: 'https://thomasfarms.com.au/cdn/shop/products/Thomas-Farms_Lamb__BBW-Chops_530x@2x.png?v=1667891990',
    },
    {
      name: 'Lamb Shank',
      imageUrl: 'https://png.pngtree.com/png-vector/20240402/ourmid/pngtree-rustic-uncooked-lamb-shank-protein-shank-rustic-png-image_12084667.png',
    },
    {
      name: 'Turkey Breast',
      imageUrl: 'https://inghams.com.au/wp-content/uploads/2022/12/12334111621150.png',
    },
    {
      name: 'Turkey Thighs',
      imageUrl: 'https://marvel-b1-cdn.bc0a.com/f00000000202513/www.fosterfarms.com/wp-content/uploads/7860-450763-TRKY-CON-TRKYTHGHS-6P_H.png',
    },
    // {
    //   name: 'Duck Breast',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Duck Legs',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Salmon Fillet',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Tuna Steak',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Shrimp',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Crab Legs',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Lobster Tail',
    //   imageUrl: '',
    // },
    // {
    //   name: 'Venison',
    //   imageUrl: '',
    // }
  ];

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

    
constructor(private router: Router){}
goToCart(meat: any) {
  this.router.navigate(['/Cart'], { state: { selectedMeat: meat } });
}

}


