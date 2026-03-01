import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css']
})
export class CreateAgentComponent {

  agent = {
    name: '',
    email: '',
    phone: '',
    password: ''
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
      !this.agent.password
    ) {
      this.errorMessage = "All fields are required!";
      return;
    }

    console.log("Agent Created:", this.agent);

    this.successMessage = "Agent Created Successfully!";

    this.agent = {
      name: '',
      email: '',
      phone: '',
      password: ''
    };
  }
}