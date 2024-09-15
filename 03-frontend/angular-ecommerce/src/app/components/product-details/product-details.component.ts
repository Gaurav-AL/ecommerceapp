import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule,HttpClientModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers: [ProductService] 
})
export class ProductDetailsComponent implements OnInit{

  products: Product | undefined;

  // Injecting productService and activatedRoute dependency
  constructor(private productService: ProductService,
              private activateRoute: ActivatedRoute){

  }
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

}
