import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit{
  subscriptionTotalPrice: any;
  subscriptionTotalQuantity: any;
  totalPrice: any;
  totalQuantity: any;
  constructor(private cartService: CartService,
              private http : HttpClient
  ){}
  ngOnInit(): void {
    this.cartService.resetData();
  }
  


}
