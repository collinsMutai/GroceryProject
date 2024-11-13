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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../website/product.service';
import { ApiResponseProduct, Item } from '../../website/Product';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class EditProductFormComponent implements OnInit {
  @Output() updateProduct: EventEmitter<any> = new EventEmitter<any>();
  @Input() edit: boolean = false;
  @Input() id!: any;
  @Input() product: Item | null = null; // Define product type
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Check for ID in route parameters
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.loadProduct(this.id);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        stock: this.product.stock,
        category: this.product.category,
        description: this.product.description,
      });
    }
  }

  loadProduct(id: string): void {
    // this.productService
    //   .getProductById(id)
    //   .subscribe((response: ApiResponseProduct) => {
    //     const product = response.product; 
    //     this.productForm.patchValue({
    //       name: product.name,
    //       image: product.image,
    //       price: product.price,
    //       stock: product.stock,
    //       category: product.category,
    //       description: product.description,
    //     });
    //   });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = {
        ...this.productForm.value,
        vendor: this.product?.vendor?._id,
      }; // Assign vendor ID here
      if (this.id) {
        this.productService.updateProduct({ ...formData, _id: this.id });
        this.toastr.success('Product updated successfully');
      } else {
        this.productService.addProduct(formData);
        this.toastr.success('Product added successfully');
      }
      this.router.navigate(['dashboard/products']);
      this.productForm.reset();
    } else {
      this.toastr.warning('Form is invalid');
    }
  }

  closeForm() {
    this.router.navigate(['dashboard/products']);
    this.updateProduct.emit('close');
  }
}
