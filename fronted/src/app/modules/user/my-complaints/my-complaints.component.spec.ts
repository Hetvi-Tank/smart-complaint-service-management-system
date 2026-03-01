import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-complaints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-complaints.component.html',
  styleUrls: ['./my-complaints.component.css']
})
export class MyComplaintsComponent {

  complaints: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {

    const userId = localStorage.getItem('userId');

    this.http.get<any[]>(
      'http://localhost:5000/api/complaints/user/' + userId
    ).subscribe(data => {
      this.complaints = data;
    });

  }
}