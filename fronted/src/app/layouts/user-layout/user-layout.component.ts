import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <h2>User Panel</h2>
      <div>
        <!-- <a routerLink="/user/dashboard">Dashboard</a>
        <a routerLink="/user/add">Add Complaint</a> -->
        <a routerLink="/login">Logout</a>
      </div>
    </nav>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar {
      background: #16a085;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      color: white;
    }

    .navbar a {
      margin-left: 15px;
      color: white;
      text-decoration: none;
    }

    .content {
      padding: 30px;
    }
  `]
})
export class UserLayoutComponent {}