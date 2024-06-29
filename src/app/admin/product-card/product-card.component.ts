import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductService } from '../products/product.service';
import { ToastrService } from 'ngx-toastr';
import { filter, from, map, mergeMap, toArray } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { EditProductFormComponent } from '../edit-product-form/edit-product-form.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, EditProductFormComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() products: any[] = [];
  edit: boolean = false;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    console.log(this.products);
  }

  productForm = this.formBuilder.group({
    productName: ['', Validators.required],
    productImage: ['', Validators.required],
    productPrice: ['', Validators.required],
    productDiscountPrice: ['', Validators.required],
    productDescription: ['', Validators.required],
  });
  editProduct(id: any) {
    this.edit = true;
    this.productService
      .getAllProducts()
      .pipe(
        map((res: any) => res),
        mergeMap((products) => from(products as any[])),
        filter((product) => product.id === id),
        toArray()
      )
      .subscribe({
        next: (filteredProducts: any[]) => {
          if (filteredProducts.length > 0) {
            const productToUpdate = filteredProducts[0];
            console.log(productToUpdate);

            this.productForm.controls['productName'].setValue(
              productToUpdate.meter_number
            );
            this.productForm.controls['productImage'].setValue(
              productToUpdate.meter_type
            );
            this.productForm.controls['productPrice'].setValue(
              productToUpdate.installation_date
            );
            this.productForm.controls['productDiscountPrice'].setValue(
              productToUpdate.installation_date
            );
            this.productForm.controls['productDescription'].setValue(
              productToUpdate.installation_date
            );
          } else {
            this.toastr.warning('Product with provided ID not found.');
          }
        },
        error: (err) => {
          this.toastr.warning('Error while fetching meters!');
        },
      });
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe((res: any) => {
      this.toastr.success('Product deleted');
    });
  }

  handleProductUpdate(updatedProduct: any) {
    console.log('Updated Product:', updatedProduct);

    this.edit = false;
  }
}
