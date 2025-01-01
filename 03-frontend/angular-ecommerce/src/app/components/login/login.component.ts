import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isDropdownOpen: boolean = false; // State to track dropdown visibility

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

}
