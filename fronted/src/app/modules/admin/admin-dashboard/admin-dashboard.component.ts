import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="layout">

    <div class="sidebar">
      <h3>Admin Panel</h3>
      <a routerLink="/admin/dashboard">Dashboard</a>
      <a routerLink="/admin/create-agent">Create Agent</a>
      <a routerLink="/admin/all-complaints">All Complaints</a>
    </div>

    <div class="content">
      <h2>Admin Dashboard</h2>
      <div class="cards">
        <div class="card">Manage Agents</div>
        <div class="card">View Complaints</div>
      </div>
    </div>

  </div>
  `,
  styles: [`
    .layout { display: flex; height: 100vh; }
    .sidebar {
      width: 220px;
      background: #2c3e50;
      color: white;
      padding: 20px;
    }
    .sidebar a {
      display: block;
      color: white;
      margin: 15px 0;
      text-decoration: none;
    }
    .sidebar a:hover { color: #1abc9c; }
    .content { flex: 1; padding: 40px; background: #f4f6f9; }
    .cards { display: flex; gap: 20px; }
    .card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      width: 200px;
      text-align: center;
    }
  `]
})
export class AdminDashboardComponent {}