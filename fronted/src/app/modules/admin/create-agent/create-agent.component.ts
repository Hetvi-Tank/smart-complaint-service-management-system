import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-agent',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css']
})
export class CreateAgentComponent {

  constructor(private http: HttpClient) {}

  agent = {
    name: '',
    email: '',
    phone: '',
    category: '',
    gender: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  createAgent() {

    this.successMessage = '';
    this.errorMessage = '';

    if (
      !this.agent.name ||
      !this.agent.email ||
      !this.agent.phone ||
      !this.agent.category ||
      !this.agent.gender
    ) {
      this.errorMessage = "All fields are required!";
      return;
    }

    this.http.post('http://localhost:5000/api/agents/create', this.agent)
      .subscribe({
        next: (res: any) => {
          this.successMessage = res.message;
          this.agent = {
            name: '',
            email: '',
            phone: '',
            category: '',
            gender: ''
          };
        },
        error: (err) => {
          this.errorMessage = err.error.message || "Something went wrong";
        }
      });
  }
}