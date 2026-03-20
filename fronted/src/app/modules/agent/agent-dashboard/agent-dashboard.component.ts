import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AgentService } from '../../../core/services/agent.service';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent implements OnInit {

  agentName: string = 'Agent';

  totalAssigned: number = 0;
  inProgress: number = 0;
  completed: number = 0;

  complaints: any[] = [];

  constructor(
    private router: Router,
    private agentService: AgentService
  ) {}

  ngOnInit() {

    this.loadComplaints();

  }

  loadComplaints() {

    this.agentService.getAssignedComplaints()
    .subscribe({

      next: (data:any[]) => {

        this.complaints = data;

        // total complaints
        this.totalAssigned = data.length;

        // in progress
        this.inProgress = data.filter(c => c.status === "In Progress").length;

        // completed
        this.completed = data.filter(c => c.status === "Completed").length;

      },

      error: (err) => {

        console.error("Error loading complaints", err);

      }

    });

  }

  logout() {

    localStorage.clear();
    this.router.navigate(['/login']);

  }

}