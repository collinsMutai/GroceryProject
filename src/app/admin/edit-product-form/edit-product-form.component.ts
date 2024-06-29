import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../products/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrl: './edit-product-form.component.css',
  imports: [FormsModule, ReactiveFormsModule],
})
export class EditProductFormComponent implements OnInit {
  @Output() updateProduct: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  productForm = this.formBuilder.group({
    productName: ['', Validators.required],
    productImage: ['', Validators.required],
    productPrice: ['', Validators.required],
    productDiscountPrice: ['', Validators.required],
    productDescription: ['', Validators.required],
  });

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.productService.addProduct(formData).subscribe(
        (response) => {
          this.toastr.success('Product added successfully');
          console.log('Product added successfully', response);
          this.productForm.reset();
        },
        (error) => {
          this.toastr.error('Error adding product');
          console.error('Error adding product', error);
        }
      );
    } else {
      this.toastr.warning('Form is invalid!');
    }
  }
  closeForm() {
    console.log('close');
this.router.navigate(['dashboard/products']);
          this.updateProduct.emit('close');



  }
}
