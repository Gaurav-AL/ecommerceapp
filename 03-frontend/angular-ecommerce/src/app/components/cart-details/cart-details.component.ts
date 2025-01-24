import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartItems } from '../../common/cart-items';
import { CartService } from '../../services/cart.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
  providers : [CheckoutComponent,RouterModule,HttpClientModule]
})
export class CartDetailsComponent implements OnInit {


    cartItems: CartItems[] | undefined = [];
    totalPriceDetails: number = 0.00;
    totalQuantityDetails: number = 0;
    constructor(private cartService: CartService,
                
    ){}
  
    ngOnInit(): void {
      this.listCartDetails();
    }
  listCartDetails() {
    // subscribe to totalPrice data

    this.cartItems = this.cartService.cartItems;
    console.log(`listCartDetails()`);
    this.cartService.totalPrice.subscribe(
      data => this.totalPriceDetails = data
    );
    // subscribe to totalQuantity data
    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantityDetails = data;
        console.log(`CartDetails totalQuantity ${this.totalQuantityDetails}`);
      }
    );

    this.cartService.computeTotal(this.cartItems);
  }
  incrementQuantity(cartItem : CartItems) {
    this.cartService.addToCart(cartItem);
  }
  decrementQuantity(cartItem : CartItems) {
    this.cartService.removeFromCart(cartItem);
  }

  remove(cartItem : CartItems) {
    this.cartService.remove(cartItem);
    this.cartService.removeFromCart(cartItem);
  }
}




