// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// import { AgentService } from '../../../core/services/agent.service';

// @Component({
//   selector: 'app-agent-dashboard',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './agent-dashboard.component.html',
//   styleUrls: ['./agent-dashboard.component.css']
// })
// export class AgentDashboardComponent implements OnInit {

//   agentName: string = 'Agent';

//   totalAssigned: number = 0;
//   inProgress: number = 0;
//   completed: number = 0;

//   complaints: any[] = [];

//   constructor(
//     private router: Router,
//     private agentService: AgentService
//   ) {}

//   ngOnInit() {

//     this.loadComplaints();

//   }

//   loadComplaints() {

//     this.agentService.getAssignedComplaints()
//     .subscribe({

//       next: (data:any[]) => {

//         this.complaints = data;

//         // total complaints
//         this.totalAssigned = data.length;

//         // in progress
//         this.inProgress = data.filter(c => c.status === "In Progress").length;

//         // completed
//         this.completed = data.filter(c => c.status === "Completed").length;

//       },

//       error: (err) => {

//         console.error("Error loading complaints", err);

//       }

//     });

//   }

//   logout() {

//     localStorage.clear();
//     this.router.navigate(['/login']);

//   }

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent implements OnInit {

  agentName: any = '';
  complaints: any[] = [];

  totalAssigned: number = 0;
  inProgress: number = 0;
  completed: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.agentName = localStorage.getItem('name');

    const token = localStorage.getItem('token');

    this.http.get<any>('http://localhost:5000/api/complaints/agent', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe((res: any) => {

      this.complaints = res;

      // ✅ COUNTS
      this.totalAssigned = this.complaints.filter(c => c.status === 'Assigned').length;
      this.inProgress = this.complaints.filter(c => c.status === 'In Progress').length;
      this.completed = this.complaints.filter(c => c.status === 'Completed').length;

    });

  }

  // ✅ STATUS UPDATE
  updateStatus(id: any, event: any) {

    const status = event.target.value;

    if (!status) return;

    const token = localStorage.getItem('token');

    this.http.put(`http://localhost:5000/api/complaints/update-status/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe(() => {

      alert("Status Updated");

      this.ngOnInit(); // 🔥 reload

    });

  }

  viewComplaint(id: any) {
    this.router.navigate(['/agent/view', id]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}