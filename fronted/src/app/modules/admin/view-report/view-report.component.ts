import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-report',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {

  report: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');

    this.http.get(`http://localhost:5000/api/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe((res:any) => {
      this.report = res;
    });

  }
  

}