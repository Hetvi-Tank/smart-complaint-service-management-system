import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  menuOpen = false; // ✅ add this
  username: string="";

  constructor(private router: Router) {

    const user = localStorage.getItem("user");

  if (user) {
    const data = JSON.parse(user);
    this.username = data.name;
  } else {
    this.username = "Admin";
  }
  } // ✅ add this

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  changePassword(){

    // common change password page
    this.router.navigate(['/change-password']);

  }

  logout() {

    localStorage.clear();

    this.router.navigate(['/login']);

  }

  

}