import { Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { ProductsComponent } from './admin/products/products.component';
import { EditProductFormComponent } from './admin/edit-product-form/edit-product-form.component';
import { ProductOrdersTableComponent } from './admin/product-orders-table/product-orders-table.component';
import { LandingComponent } from './website/landing/landing.component';
import { CategoryProductsComponent } from './website/category-products/category-products.component';
import { WebproductsComponent } from './website/webproducts/webproducts.component';
import { ProductDetailsComponent } from './website/product-details/product-details.component';


export const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: 'shop', component: WebproductsComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
    ],
  },

  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'add-product', component: EditProductFormComponent },
      { path: 'orders', component: ProductOrdersTableComponent },
    ],
  },
];
