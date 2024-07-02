import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../products/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { filter, from, map, mergeMap, toArray } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrl: './edit-product-form.component.css',
  imports: [FormsModule, ReactiveFormsModule],
})
export class EditProductFormComponent implements OnInit {
  @Output() updateProduct: EventEmitter<any> = new EventEmitter<any>();
  @Input() edit: boolean = false;
  @Input() id!: any;
  @Input() product: any;
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      productName: this.formBuilder.control(''),
      productImage: this.formBuilder.control(''),
      productPrice: this.formBuilder.control(''),
      productDiscountPrice: this.formBuilder.control(''),
      productDescription: this.formBuilder.control(''),
    });
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.productForm.patchValue({
        productName: this.product.productName,
        productImage: this.product.productImage,
        productPrice: this.product.productPrice,
        productDiscountPrice: this.product.productDiscountPrice,
        productDescription: this.product.productDescription,
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (!this.edit) {
        const formData = this.productForm.value;
        this.productService.addProduct(formData).subscribe(
          (response) => {
            this.toastr.success('Product added successfully');
            this.router.navigate(['dashboard/products']);
            this.productForm.reset();
          },
          (error) => {
            this.toastr.error('Error adding product');
            console.error('Error adding product', error);
          }
        );
      } else {
        this.productService
          .updateProduct(this.id, this.productForm.value)
          .subscribe(
            (response) => {
              this.toastr.success('Product updated successfully');
              this.updateProduct.emit();
              this.router.navigate(['dashboard/products']);
            },
            (error) => {
              this.toastr.error('Error updating product');
              console.error('Error updating product', error);
            }
          );
      }
    } else {
      this.toastr.warning('Form is invalid');
    }
  }
  closeForm() {
    console.log('close');
    this.router.navigate(['dashboard/products']);
    this.updateProduct.emit('close');
  }
}
