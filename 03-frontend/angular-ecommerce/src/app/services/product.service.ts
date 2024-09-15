import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // Spring boot Url
  private productBaseUrl = 'http://localhost:8080/api/products';
  private productCategoryBaseUrl = 'http://localhost:8080/api/product-category';

  // Inject HTTP Client 
  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number) : Observable<Product[]>{
    // @TODO : need to build URL based on category id.
    const searchUrl = `${this.productBaseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage: number,
                        thePageSize: number,
                        theCategoryId: number) : Observable<GetResponseProducts>{
    // @TODO : need to build URL based on category id.
    const searchUrl = `${this.productBaseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      +`&page=${thePage}&size=${thePage}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  
   // Helper method for searching product by value or keyword
  searchProductByValue(getValue: string | null):Observable<Product[]> {
    const searchUrl = `${this.productBaseUrl}/search/findByNameContaining?name=${getValue}`;
    return this.getProducts(searchUrl);
  }
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.product)
    );
  }
  // Product category menu helper methods
  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.productCategoryBaseUrl).pipe(
        map(response => response._embedded.productCategory)
      );
  }

  getProduct(getId: number): Observable<Product> {
    const searchUrl = `${this.productBaseUrl}/${getId}`;
    return this.httpClient.get<Product>(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded  : {
    product : Product[];
  },
  // page added for pagination support
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded  : {
    productCategory : ProductCategory[];
  }
}
