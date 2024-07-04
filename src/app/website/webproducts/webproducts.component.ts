import { Component } from '@angular/core';
import { FeaturedSliderComponent } from '../featured-slider/featured-slider.component';
import { FruitComponent } from '../fruit/fruit.component';
import { VegetableComponent } from '../vegetable/vegetable.component';

@Component({
  selector: 'app-webproducts',
  standalone: true,
  imports: [FeaturedSliderComponent, FruitComponent, VegetableComponent],
  templateUrl: './webproducts.component.html',
  styleUrl: './webproducts.component.css',
})
export class WebproductsComponent {}
