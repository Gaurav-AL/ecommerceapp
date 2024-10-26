import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReviewOrderComponent } from './components/review-order/review-order.component';
import { PurchaseComponent } from './components/purchase/purchase.component';



// Order of the routes does matter
export const routes: Routes = [
    { path : 'products/:id', component: ProductDetailsComponent,pathMatch:'prefix'},
    { path : 'search/:keyword', component: ProductListComponent,pathMatch:'prefix'},
    { path : 'category/:id', component: ProductListComponent,pathMatch:'prefix'},
    { path : 'review-order', component: ReviewOrderComponent,pathMatch:'full'},
    { path : 'cart-details', component: CartDetailsComponent,pathMatch:'prefix'},
    { path : 'category', component: ProductListComponent,pathMatch:'full'},
    { path : 'products', component: ProductListComponent,pathMatch:'full'},
    { path : 'checkout', component: CheckoutComponent,pathMatch:'full'},
    { path : 'purchase', component: PurchaseComponent,pathMatch:'full'},
    { path : '', redirectTo:'/products', pathMatch:'full'},
    { path : '**', redirectTo:'/products', pathMatch:'full'}, // generic wild card path
];


