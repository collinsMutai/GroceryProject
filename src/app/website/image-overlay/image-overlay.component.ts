import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ImageOverlayComponent {
  isOverlayVisible = true;

  hideOverlay() {
    const overlayElement = document.querySelector('.overlay');
    if (overlayElement) {
      overlayElement.classList.add('hiding');

      // Remove the overlay after the animation completes
      setTimeout(() => {
        this.isOverlayVisible = false;
      }, 1000); // Duration of the animation
    }
  }
}
