import { Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { ProductsComponent } from './admin/products/products.component';
import { EditProductFormComponent } from './admin/edit-product-form/edit-product-form.component';
import { ProductOrdersTableComponent } from './admin/product-orders-table/product-orders-table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
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
