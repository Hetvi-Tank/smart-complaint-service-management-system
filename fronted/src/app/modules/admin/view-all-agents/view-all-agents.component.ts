import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-agents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all-agents.component.html',
  styleUrls: ['./view-all-agents.component.css']
})
export class ViewAllAgentsComponent implements OnInit {

  agents: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAgents();
  }

  getAgents() {
    this.http.get<any[]>('http://localhost:5000/api/agents/all')
      .subscribe({
        next: (res) => {
          console.log(res);
          this.agents = res;
        },
        error: (err) => {
          console.error("Error fetching agents:", err);
        }
      });
  }

}
