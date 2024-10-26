import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from './services/product.service';
import { AppComponent } from './app.component';
import { ActivatedRoute, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReviewOrderComponent } from './components/review-order/review-order.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    ReviewOrderComponent,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule,RouterOutlet],
  providers:[ProductService, provideHttpClient(withFetch())]
})
export class AppModule { }
