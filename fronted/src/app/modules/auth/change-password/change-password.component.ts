import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

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

  // show hide password
  showCurrent = false;
  showNew = false;
  showConfirm = false;

  constructor(private http: HttpClient) {}

  toggleCurrent(){
    this.showCurrent = !this.showCurrent;
  }

  toggleNew(){
    this.showNew = !this.showNew;
  }

  toggleConfirm(){
    this.showConfirm = !this.showConfirm;
  }

changePassword() {

  this.errorMessage = '';
  this.successMessage = '';

  if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
    this.errorMessage = "All fields are required";
    return;
  }

  if (this.newPassword !== this.confirmPassword) {
    this.errorMessage = "Passwords do not match";
    return;
  }

  const email = localStorage.getItem('email');
  if (!email) {
    this.errorMessage = "User not logged in";
    return;
  }

  this.http.put('http://localhost:5000/api/auth/change-password', {
    email,
    currentPassword: this.currentPassword,
    newPassword: this.newPassword,
    confirmPassword: this.confirmPassword  // 👈 Add this
  })
  .subscribe({
    next: (res: any) => {
      this.successMessage = res.message;
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    },
    error: (err) => {
      this.errorMessage = err.error.message || 'Something went wrong';
    }
  });
}

}