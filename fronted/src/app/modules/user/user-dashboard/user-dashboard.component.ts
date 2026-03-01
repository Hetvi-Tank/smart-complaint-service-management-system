import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="layout">

    <div class="sidebar">
      <h2>User Panel</h2>

      <a routerLink="/user/dashboard">Dashboard</a>
      <a routerLink="/user/add">Add Complaint</a>
      <a routerLink="/user/my-complaints">My Complaints</a>
      <button (click)="logout()">Logout</button>
    </div>

    <div class="content">
      <h1>Welcome to User Dashboard</h1>

      <div class="cards">

        <div class="card" routerLink="/user/add">
          <h3>Add Complaint</h3>
          <p>Create new complaint easily.</p>
        </div>

        <div class="card" routerLink="/user/my-complaints">
          <h3>My Complaints</h3>
          <p>Track your complaint status.</p>
        </div>

      </div>
    </div>

  </div>
  `,
  styles: [`
    .layout {
      display: flex;
      height: 100vh;
    }

    .sidebar {
      width: 230px;
      background: #2c3e50;
      color: white;
      padding: 25px;
      display: flex;
      flex-direction: column;
    }

    .sidebar h2 {
      margin-bottom: 30px;
    }

    .sidebar a {
      color: white;
      text-decoration: none;
      margin-bottom: 15px;
      padding: 8px;
      border-radius: 6px;
      transition: 0.3s;
    }

    .sidebar a:hover {
      background: #34495e;
    }

    .sidebar button {
      margin-top: auto;
      padding: 10px;
      background: #e74c3c;
      border: none;
      color: white;
      border-radius: 6px;
      cursor: pointer;
    }

    .content {
      flex: 1;
      padding: 40px;
      background: #f4f6f9;
    }

    .cards {
      display: flex;
      gap: 25px;
      margin-top: 30px;
    }

    .card {
      background: white;
      padding: 30px;
      width: 250px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: 0.3s;
    }

    .card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class UserDashboardComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}