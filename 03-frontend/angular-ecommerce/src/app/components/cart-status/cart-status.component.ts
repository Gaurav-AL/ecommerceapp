import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit{

  totalPrice: number = 0.00; //Use two decimal point else can get error in totalPrice range
  totalQuantity: number = 0;
      
  constructor(private cartService : CartService){}
  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
    // subscribe to totalPrice data
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to totalQuantity data
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
  // this.totalPrice = this.cartService.totalPrice;
  // this.totalQuantity = this.cartService.totalQuantity;
}
