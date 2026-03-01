import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="layout">

      <nav class="navbar">
        <h2>Admin Panel</h2>
        <div>
          <!-- <a routerLink="/admin/dashboard">Dashboard</a>
          <a routerLink="/admin/create-agent">Create Agent</a> -->
          <a routerLink="/login">Logout</a>
        </div>
      </nav>

      <div class="content">
        <router-outlet></router-outlet>
      </div>

    </div>
  `,
  styles: [`
    .navbar {
      background: #2c3e50;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }

    .navbar a {
      margin-left: 15px;
      color: white;
      text-decoration: none;
    }

    .navbar a:hover {
      text-decoration: underline;
    }

    .content {
      padding: 30px;
    }
  `]
})
export class AdminLayoutComponent {}