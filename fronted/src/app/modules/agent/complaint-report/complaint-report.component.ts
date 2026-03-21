import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaint-report',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './complaint-report.component.html',
  styleUrls: ['./complaint-report.component.css']
})
export class ComplaintReportComponent {

  complaintId: any;
  selectedFile: any;

  report: any = {
    workDescription: '',
    materialUsed: '',
    completionDate: '',
    progress: '',
    finalRemark: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.complaintId = this.route.snapshot.paramMap.get('id');

    // ✅ FIX: role set kar do (guard ke liye)
  const role = localStorage.getItem('role');

  if (!role) {
    localStorage.setItem('role', 'agent');
  }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitReport() {

    const formData = new FormData();

    formData.append('workDescription', this.report.workDescription);
    formData.append('materialUsed', this.report.materialUsed);
    formData.append('completionDate', this.report.completionDate);
    formData.append('progress', this.report.progress);
    formData.append('finalRemark', this.report.finalRemark);
    formData.append('photo', this.selectedFile);

    const token = localStorage.getItem('token');

    this.http.post(`http://localhost:5000/api/reports/${this.complaintId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
  next: (res) => {

    console.log("SUCCESS", res); // 🔍 check

    alert("Report Submitted Successfully");

    this.router.navigate(['/agent/dashboard']);

  },
  error: (err) => {

    console.error("ERROR", err);

    alert("Something went wrong");

  }

    });

  }

}