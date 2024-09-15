import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ RouterModule, CommonModule, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  providers:[ProductService]
})
export class SearchComponent implements OnInit{

  
  constructor(private route: Router){
    
  }

  searchProductByValue(value: string) {
  
    console.log(`Value :${value}`);
    this.route.navigateByUrl(`/search/${value}`);
    }

  ngOnInit(): void {
      // throw new Error('Method not implemented.');
    }

}
