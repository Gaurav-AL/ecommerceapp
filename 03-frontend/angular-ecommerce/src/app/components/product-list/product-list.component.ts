import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductCategory } from '../../common/product-category';
import { SearchComponent } from '../search/search.component';
import { get } from 'http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule,NgbModule],
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
  currentCategory: string | undefined;
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  Products: Product[] = [];
  searchMode: boolean = false;
  searchKeyword: string = '';

  // new property for pagination
  pageSize: number = 10;
  pageNumber: number = 1;
  totalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  // Search helper methods
  handleSearchProducts() {
    // get the keyword from route
    const getValue = this.route.snapshot.paramMap.get('keyword')!;
    this.searchKeyword = getValue;
    // search with the keyword
    this.productService
      .searchProductByValue(getValue)
      .subscribe((data: Product[]) => {
        this.Products = data;
      });
  }

  // Id search Helper method
  handleListProducts() {
    // check if "id parameter is available"
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      //get the "id" parameter string a dn convert to number using "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; // I can suppress warning of null with "!" as i am sure it's not null
      // Getting Current "Category" shown in the top of Page
      this.productService
        .getProductCategories()
        .subscribe((data: ProductCategory[]) => {
          this.currentCategory = data.find(
            (category) => category.id == this.currentCategoryId
          )?.categoryName;
          console.log('current category :' + this.currentCategory);
        });
    } else {
      //not category id available, set default to 1
      this.currentCategoryId = 1;
      this.currentCategory = 'Books';
    }
    /*
     * Check if we have different category than previous then set the pageNumber back to 1
     * Note: Angular will reuse a component if it is currently being viewed
     */
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`this.currentCategoryId : ${this.currentCategoryId}&this.pageNumber : ${this.pageNumber}`);

    // Angular support 1 index based pagination while spring supports 0 index based pagination support.
    this.productService.getProductListPaginate(this.pageNumber-1,
                              this.pageSize,
                              this.currentCategoryId
      ).subscribe((data) => {
        this.Products = data._embedded.product;
        // console.log("ProductData :"+ JSON.stringify(data));
        this.pageNumber = data.page.number+1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      });
  }
}
