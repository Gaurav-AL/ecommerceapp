import { Injectable } from '@angular/core';
import { CartItems } from '../common/cart-items';
import { Subject } from 'rxjs';
import { couldStartTrivia } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItems[] = [];

  // subject is a subclass of Observable, we can use subject to publish event in our code.

  totalPrice: Subject<number> = new Subject<number>;
  totalQuantity: Subject<number> = new Subject<number>;
  constructor() { }

  removeFromCart(cartItem: CartItems){
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItems | undefined;
    if(this.cartItems.length > 0){
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == cartItem.id);
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    console.log(`alreadyExistsInCart : ${alreadyExistsInCart}`);
    if(alreadyExistsInCart && cartItem.quantity > 0){
      // Since existingCartItem is undefined we will get error for null, so ternary operator :)
      existingCartItem ? existingCartItem.quantity -= 1 : console.log("Item not found.");
    }else{
      this.remove(cartItem);
    }
    // compute totalPrice and totalQuantity
    this.computeTotal(this.cartItems);
  }
  remove(cartItem: CartItems) {
    const index = this.cartItems.findIndex(tempCartItem => tempCartItem.id == cartItem.id);
      // Remove the item from the array using splice
      if (index > -1) {
        this.cartItems.splice(index, 1); // Removes 1 item at the given index
      }
  }
  addToCart(cartItem: CartItems){
    // check if we already have the item in our cart

    // addedCartItem : Map<string, CartItems> = new Map(); 
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItems | undefined;
    if(this.cartItems.length > 0){
      // for(let tempCartItem of this.cartItems){
      //     if(tempCartItem.id == cartItem.id){
      //       existingCartItem = tempCartItem;
      //       break;
      //     } 
      // }
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == cartItem.id);
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    console.log(`alreadyExistsInCart : ${alreadyExistsInCart}`);
    if(alreadyExistsInCart){
      // Since existingCartItem is undefined we will get error for null, so ternary operator :)
      existingCartItem ? existingCartItem.quantity += 1 : console.log("Item not found.");
    }
    else{
      this.cartItems.push(cartItem);
    }
    // compute totalPrice and totalQuantity
    this.computeTotal(this.cartItems);
  }
  resetData(){
    this.totalPrice.next(0);
    this.totalQuantity.next(0);
  }
  computeTotal(currentCartItem: CartItems[]) {
    let totalPriceVal:  number = 0;
    let totalQuantityVal: number = 0;

    for(let currItem of currentCartItem){
      totalPriceVal += currItem.quantity * currItem.unitPrice;
      totalQuantityVal += currItem.quantity;
    }
    // totalPriceVal.toFixed(3);

    // passing the latest value to the totalPrice,totalQuantity that is an subject type subclass of Observable
    this.totalPrice.next(totalPriceVal);
    this.totalQuantity.next(totalQuantityVal);

    this.logCartData(totalPriceVal, totalQuantityVal);
  }
  logCartData(totalPriceVal: number, totalQuantityVal: number) {
    console.log("Current Session Content of the Cart");
    console.log('--------------------------------------');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name : ${tempCartItem.name},\n quantity = ${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice=${totalPriceVal.toFixed(2)}, totalQuantity=${totalQuantityVal}`);
    console.log('--------------------------------------');
  }

}

