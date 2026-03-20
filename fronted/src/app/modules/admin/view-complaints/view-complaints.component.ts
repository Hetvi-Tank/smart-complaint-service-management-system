import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-complaints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.css']
})
export class ViewComplaintsComponent implements OnInit {

  complaints: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.http.get<any>('http://localhost:5000/api/complaints/all')
      .subscribe(res => {

        console.log(res);
        
        this.complaints = res;

      });

  }

}