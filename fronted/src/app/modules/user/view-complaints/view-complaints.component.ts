import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-complaints',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.css']
})
export class ViewComplaintsComponent implements OnInit {

  complaints: any[] = [];
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getComplaints();
  }

  getComplaints() {

    const token = localStorage.getItem('token');

    this.http.get<any[]>(
      'http://localhost:5000/api/complaints/my-complaints',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

      next: (data) => {
        this.complaints = data;

        if (this.complaints.length === 0) {
          this.message = "No complaints found.";
        }
      },

      error: (err) => {
        console.error(err);
        this.message = "Error loading complaints";
      }

    });

  }

}