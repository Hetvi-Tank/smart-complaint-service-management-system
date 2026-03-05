import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, NgIf, HttpClientModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient) {}

  changePassword() {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    const email = localStorage.getItem('email');  // 👈 Important

    this.http.put('http://localhost:5000/api/auth/change-password', {
      email,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    })
    .subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }
}