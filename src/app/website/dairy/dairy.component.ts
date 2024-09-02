import { AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'owl.carousel';
import { Router } from '@angular/router';
declare var $: any

@Component({
  selector: 'app-dairy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dairy.component.html',
  styleUrl: './dairy.component.css'
})
export class DairyComponent implements AfterViewInit{
  @ViewChild('owlCarousel3', { static: true }) owlCarousel3!: ElementRef;

  dairys = [
    {
      "name": "Almonds",
      "imageUrl": "https://static.vecteezy.com/system/resources/previews/012/596/321/non_2x/almond-nut-with-leaves-png.png"
    },
    {
      "name": "Cashews",
      "imageUrl": "https://pngfre.com/wp-content/uploads/cashew-poster.png"
    },
    {
      "name": "Walnuts",
      "imageUrl": "https://pngimg.com/d/walnut_PNG24.png"
    },
    {
      "name": "Dried Apricots",
      "imageUrl": "https://static.vecteezy.com/system/resources/previews/024/108/084/original/dried-tasty-apricot-fruit-with-seed-isolated-on-transparent-background-png.png"
    },
    {
      "name": "Raisins",
      "imageUrl": "https://5.imimg.com/data5/SELLER/Default/2024/1/373521800/PV/KX/VF/196698357/raisins-500x500.png"
    },
    {
      "name": "Sunflower Seeds",
      "imageUrl": "https://yi-files.yellowimages.com/products/914000/914532/1550528-cover.jpg"
    },
  
    {
      "name": "Dried Mango",
      "imageUrl": "https://png.pngtree.com/png-vector/20230922/ourmid/pngtree-dried-mango-slices-on-background-ingredient-png-image_10097425.png"
    },
    {
      "name": "Trail Mix",
      "imageUrl": "https://www.grandmaemily.com/cdn/shop/products/GE-6118_grande.png?v=1623691242"
    },
    {
      "name": "Granola",
      "imageUrl": "https://www.pngitem.com/pimgs/m/615-6156989_granola-bag-packaging-hd-png-download.png"
    },
    {
      "name": "Beef Jerky",
      "imageUrl": "https://www.jacklinks.com/shop/media/catalog/product/1/0/10000017993_3.25oz_jl_bf_jala_jerk_hero.png"
    },
    {
      "name": "Dried Cranberries",
      "imageUrl": "https://mariani.com/cdn/shop/products/08_cranberries_front_1080x.png?v=1623297636"
    },
    {
      "name": "Dried Fish",
      "imageUrl": "https://ceylonfood.co.uk/wp-content/uploads/2022/03/linna.png"
    },
    {
      "name": "Pita Chips",
      "imageUrl": "https://pretzelized.com/cdn/shop/files/PDP_Front-Package_Pita_Everything.png?v=1711683280"
    },
    {
      "name": "Rice Cakes",
      "imageUrl": "https://png.pngtree.com/png-vector/20231120/ourmid/pngtree-stack-of-rice-cakes-nobody-png-image_10580868.png"
    }
  ]
  
  
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
  goToCart(dairy:any){
    this.router.navigate(['/Cart'], {state: {selectedDairy: dairy}});
  }
}
