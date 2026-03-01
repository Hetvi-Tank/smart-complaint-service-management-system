import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
  <div class="page">
    <h2>Agent Dashboard</h2>
    <a routerLink="/agent/assigned">View Assigned Complaints</a>
  </div>
  `,
  styles: [`
    .page { padding:40px; }
    a { font-size:18px; color:#3498db; }
  `]
})
export class AgentDashboardComponent {}