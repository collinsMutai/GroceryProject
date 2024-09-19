import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductService } from '../products/product.service';
import { ToastrService } from 'ngx-toastr';
import { filter, from, map, mergeMap, toArray } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { EditProductFormComponent } from '../edit-product-form/edit-product-form.component';
import { Item } from '../../website/Product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, EditProductFormComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() products!: Item[];
  edit: boolean = false;
  editedProductId: any;
  product: any;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  productForm = this.formBuilder.group({
    productName: ['', Validators.required],
    productImage: ['', Validators.required],
    productPrice: ['', Validators.required],
    productDiscountPrice: ['', Validators.required],
    productDescription: ['', Validators.required],
  });
  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products: any) => {
        this.products = products;
      },
      (error) => {
        this.toastr.error('Error fetching products');
        console.error('Error fetching products', error);
      }
    );
  }

  editProduct(id: any) {
    this.edit = true;
    this.editedProductId = id;

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
            this.product = filteredProducts[0];
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

      this.productService.getAllProducts().subscribe((products: any) => {
        this.products = products;
      });
    });
  }

  handleProductUpdate(updatedProduct: any) {
    console.log('Updated Product:', updatedProduct);
    this.loadProducts();
    this.edit = false;
  }
}
