import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  selectedSpice: any;
selectedVegetable: any;
selectedMeat: any;
selectedDairy: any;

  constructor( @Inject(PLATFORM_ID) private platformId: Object, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedSpice = history.state.selectedSpice;
    // if (!this.selectedSpice) {
    //   this.router.navigate(['/spices']);
    // }
    this.selectedVegetable = history.state.selectedVegetable;
    this.selectedMeat = history.state.selectedMeat;
    this.selectedDairy = history.state.selectedDairy;
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('scrollreveal').then((ScrollReveal) => {
        const scrollRevealOption = {
          distance: '50px',
          origin: 'bottom',
          duration: 1800,
        };
       ScrollReveal.default().reveal(".image img", {
          ...scrollRevealOption,
          origin: "left",
        });


     
      });
    }
  }

  selectedUnit = 'PER 500G';
  quantity = 1;

  selectUnit(unit: string) {
    this.selectedUnit = unit;
  }
  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addToCart() {
    // Implement add to cart logic here
    alert(`${this.quantity} unit(s) of ${this.selectedSpice.name} added to cart.`);
    alert(`${this.quantity} unit(s) of ${this.selectedVegetable.name} added to cart.`);
    alert(`${this.quantity} unit(s) of ${this.selectedMeat.name} added to cart.`);
    alert(`${this.quantity} unit(s) of ${this.selectedDairy.name} added to cart.`);
    // alert(`${this.quantity} unit(s) of ${this.selectedSpice.name} added to cart.`);
}
}

