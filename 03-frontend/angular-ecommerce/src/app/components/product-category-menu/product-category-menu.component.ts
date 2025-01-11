import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css',
  providers:[ProductService]
})
export class ProductCategoryMenuComponent implements OnInit{
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
      this.isDropdownOpen = false;
  }
  productCategories: ProductCategory[] = [];
  constructor(private productServices: ProductService,private http: HttpClient){
    
  }
  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories(){
    this.productServices.getProductCategories().subscribe(
      (      data: ProductCategory[]) =>{
        console.log("Product categories are :"+ JSON.stringify(data));
        this.productCategories = data;
      }
    )
  }



}
