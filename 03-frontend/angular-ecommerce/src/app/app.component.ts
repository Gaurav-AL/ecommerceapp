import { Component, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";
import { SearchComponent } from "./components/search/search.component";
import { CartStatusComponent } from "./components/cart-status/cart-status.component";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { LogoComponent } from "./components/logo/logo.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, HttpClientModule, ProductCategoryMenuComponent, SearchComponent, CartStatusComponent, RouterModule, CommonModule, LoginComponent, LogoComponent],
  templateUrl: './app.component.html',
  // template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-ecommerce';
  private lastScrollTop = 0;
  public isHeaderVisible = true; // Flag to control header visibility

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Check if scrolling down or up
    if (currentScroll > this.lastScrollTop && currentScroll > 100) {
      // Scrolling down
      this.isHeaderVisible = false;
    } else {
      // Scrolling up
      this.isHeaderVisible = true;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }
}
