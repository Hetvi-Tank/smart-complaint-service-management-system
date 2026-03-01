import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <h2>Agent Panel</h2>
      <div>
        <a routerLink="/agent/dashboard">Dashboard</a>
        <a routerLink="/agent/assigned">Assigned Complaints</a>
        <a routerLink="/login">Logout</a>
      </div>
    </nav>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar {
      background: #34495e;
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
export class AgentLayoutComponent {}