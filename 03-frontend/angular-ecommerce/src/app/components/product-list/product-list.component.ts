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
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ProductCategory } from '../../common/product-category';
import { SearchComponent } from '../search/search.component';
import { get } from 'http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItems } from '../../common/cart-items';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule,NgbModule,RouterOutlet],
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductService],
  
})
export class ProductListComponent implements OnInit {

  
  currentCategory: string | undefined = 'Books';
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  Products: Product[] = [];
  searchMode: boolean = false;
  searchKeyword: string = '';

  // For Pagination Support
  previousKeyword: string = '';

  // new property for pagination
  pageSize: number = 5;
  pageNumber: number = 1;
  totalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartServices: CartService
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
    this.searchKeyword = this.route.snapshot.paramMap.get('keyword')!;
    // search with the keyword

    // search pageNumber to 1 if previous keyword != current Keyword
    if(this.previousKeyword != this.searchKeyword){
      this.pageNumber = 1;
    }
    this.previousKeyword = this.searchKeyword;

    this.productService.searchProductPaginate(this.pageNumber-1,
                                              this.pageSize,
                                              this.searchKeyword).subscribe(this.processResult());
    // this.productService
    //   .searchProductByValue(this.searchKeyword)
    //   .subscribe((data: Product[]) => {
    //     this.Products = data;
    //   });
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
    }
    /* Pagination Implementation */
    // Angular support 1 index based pagination while spring supports 0 index based pagination support.
    this.productService.getProductListPaginate(this.pageNumber-1,
                              this.pageSize,
                              this.currentCategoryId
      ).subscribe(this.processResult());

      /*
     * Check if we have different category than previous then set the pageNumber back to 1
     * Note: Angular will reuse a component if it is currently being viewed
     */
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    // console.log(`this.currentCategoryId : ${this.currentCategoryId}&this.pageNumber : ${this.pageNumber}&this.pageSize : ${this.pageSize}`);  
  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.listProducts();
    }
    /* Helper method to format the subscribe data in case of Pagination */
    processResult() {
      return (data : any) => {
        this.Products = data._embedded.product;
        console.log("ProductData Inside:"+ JSON.stringify(data));
        this.pageNumber = (data.page.number)+1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    }

    /* Adding to cart implementation*/
    addToCart(ProductList: Product) {
      console.log(`Add to cart ${ProductList.name}, ${ProductList.unitPrice}`);
      const cartItem = new CartItems(ProductList);
      this.cartServices.addToCart(cartItem);
    }
}


