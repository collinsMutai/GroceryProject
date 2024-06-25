import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-set-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './set-location.component.html',
  styleUrl: './set-location.component.css',
})
export class SetLocationComponent {
  showContent = false;
  openLocationModal() {
    this.showContent = !this.showContent;
  }
  closeLocationModal(){
     this.showContent = !this.showContent;
  }
}
