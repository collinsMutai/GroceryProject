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
import { CheckoutComponent } from './website/checkout/checkout.component';
import { CustomerCartComponent } from './website/customer-cart/customer-cart.component';
import { FAQsComponent } from './website/faqs/faqs.component';
import { AboutComponent } from './admin/about/about.component';
import { BlogComponent } from './website/blog/blog.component';
import { MerchantComponent } from './website/merchant/merchant.component';
import { ContactComponent } from './website/contact/contact.component';
import { CartComponent } from './admin/cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LandingComponent,
    children: [
      { path: 'shop', component: WebproductsComponent },
      { path: 'category', component: CategoryProductsComponent },
      // { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CustomerCartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'faqs', component: FAQsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'merchants', component: MerchantComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'products/:id', component: CartComponent },
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
