import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  name: string = "";
  complaints: any[] = [];

  total = 0;
  pending = 0;
  completed = 0;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  logout() {
    localStorage.clear();
    alert("Logged out successfully");
    this.router.navigate(['/login']);
  }

  ngOnInit() {

    const user = localStorage.getItem("user");

    if (user) {
      const data = JSON.parse(user);
      this.name = data.name;
    }

    this.loadComplaints();

  }

  viewReport(id: any) {
  this.router.navigate(['/user/view-report', id]);
}

  loadComplaints() {

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>(
      "http://localhost:5000/api/complaints/my-complaints",
      { headers }
    )
    .subscribe({

      next: (data) => {

        this.complaints = data;

        this.total = data.length;

        this.pending = data.filter(c => c.status === "Pending"|| c.status === "Assigned" ||
          c.status === "In Progress"
        ).length;

        this.completed = data.filter(c => c.status === "Completed").length;

      },

      error: (err) => {
        console.error("Complaint Load Error:", err);
      }

    });

  }
  // ✅ NEW: FEEDBACK FUNCTION
 submitFeedback(id: any, rating: any, comment: any) {

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  this.http.put(
    `http://localhost:5000/api/complaints/feedback/${id}`,
    { rating, comment },
    { headers }
  ).subscribe(() => {

    alert("Feedback Submitted");

    this.loadComplaints();

  });

}

}