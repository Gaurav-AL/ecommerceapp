import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ProductService } from './services/product.service';
import { AppComponent } from './app.component';
import { ActivatedRoute, provideRouter, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReviewOrderComponent } from './components/review-order/review-order.component';
// import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { CheckOutServicesService } from './services/check-out-services.service';
import { PaymentService } from './services/payment.service';
import { CartService } from './services/cart.service';
import { ShopchatService } from './services/shopchat.service';




@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes),
    RouterOutlet,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    ReviewOrderComponent,
    NgbModule,
    FormsModule
  ],
  exports: [RouterModule,RouterOutlet],
  providers:[
            HttpClientModule,
            ProductService, 
            CheckOutServicesService,
            PaymentService,
            CartService,
            ShopchatService,
            provideHttpClient(),
            provideRouter(routes),
            HttpClient
            ]
})
export class AppModule { }
