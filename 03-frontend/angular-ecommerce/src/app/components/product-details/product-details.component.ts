import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartItems } from '../../common/cart-items';
import { CartService } from '../../services/cart.service';
import { ProductReviewsComponent } from "../product-reviews/product-reviews.component";
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductReviewsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers: [ProductService] 
})
export class ProductDetailsComponent implements OnInit{


  products: Product | undefined;


  // Injecting productService and activatedRoute dependency
  constructor(private productService: ProductService,
              private activateRoute: ActivatedRoute,
              private cartServices: CartService,
              private http: HttpClient){}
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(()=>
    {
        this.handleProductDetails();
    });
  }
  handleProductDetails() {
    // get id from the route and convert to number using + symbol
    const getId = +this.activateRoute.snapshot.paramMap.get('id')!;

    this.productService.getProduct(getId).subscribe((data)=>
    {
      console.log("......Id is :"+ getId +"\nProductDesc :"+JSON.stringify(data));
      this.products = data;
    })
  }
  /* Adding to cart implementation*/
  addToCart(ProductList: Product) {
    console.log(`Add to cart ${ProductList.name}, ${ProductList.unitPrice}`);
    const cartItem = new CartItems(ProductList);
    this.cartServices.addToCart(cartItem);
  }
}
