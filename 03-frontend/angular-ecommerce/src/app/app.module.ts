import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from './services/product.service';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppComponent,
    ProductListComponent,
    NgbModule
  ],
  exports: [RouterModule],
  providers:[ProductService, provideHttpClient(withFetch())]
})
export class AppModule { }
