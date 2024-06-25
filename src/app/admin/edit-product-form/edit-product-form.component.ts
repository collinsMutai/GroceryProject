import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product-form.component.html',
  styleUrl: './edit-product-form.component.css',
})
export class EditProductFormComponent {}
