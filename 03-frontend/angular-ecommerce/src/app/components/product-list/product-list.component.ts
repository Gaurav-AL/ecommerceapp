import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ CommonModule, HttpClientModule],
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductService] 
})
export class ProductListComponent implements OnInit{

  Products: Product[] = [];
  constructor(private productService: ProductService){

  }
    ngOnInit(): void {
        this.listProducts();
    }

    listProducts() {
      this.productService.getProductList().subscribe(
        data => {
          this.Products = data;
        }
      )
    }
}

