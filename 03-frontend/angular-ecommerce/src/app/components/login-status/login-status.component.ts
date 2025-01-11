import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { Router } from 'express';


@Component({
  selector: 'app-login-status',
  standalone: true,
  host: { ngSkipHydration: 'true' },
  imports: [CommonModule,RouterModule],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
  providers: [AuthService]

})
export class LoginStatusComponent  implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
  isDropdownOpen = false;
  isAuthenticated = false; // Replace with your authentication logic
  userFullName = ''; // Replace with the logged-in user's name

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    // Implement logout logic
    console.log('Logout clicked');
  }
}
