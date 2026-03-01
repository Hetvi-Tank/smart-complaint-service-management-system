import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assigned-complaints',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:20px">

      <h2>Assigned Complaints</h2>

      <table border="1" width="100%">
        <tr>
          <th>User</th>
          <th>Title</th>
          <th>Status</th>
          <th>Action</th>
        </tr>

        <tr *ngFor="let c of complaints">
          <td>{{ c.user?.name }}</td>
          <td>{{ c.title }}</td>
          <td>{{ c.status }}</td>
          <td>
            <button (click)="updateStatus(c._id, 'In Progress')">
              In Progress
            </button>

            <button (click)="updateStatus(c._id, 'Completed')">
              Completed
            </button>
          </td>
        </tr>
      </table>

    </div>
  `
})
export class AssignedComplaintsComponent implements OnInit {

  complaints: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {

    const token = localStorage.getItem('token');

    this.http.get<any[]>(
      'http://localhost:5000/api/complaints/agent',
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe(res => {
      this.complaints = res;
    });
  }

  updateStatus(id: string, status: string): void {

    const token = localStorage.getItem('token');

    this.http.put(
      `http://localhost:5000/api/complaints/update-status/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe(() => {
      this.loadComplaints();
    });
  }

}