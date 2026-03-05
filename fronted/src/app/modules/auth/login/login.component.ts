import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="auth-wrapper">

    <div class="auth-card">

      <h2>Login</h2>

      <form (ngSubmit)="login()">

        <div class="form-group">
          <label>Email</label>
          <input type="email"
                 [(ngModel)]="form.email"
                 name="email"
                 required>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password"
                 [(ngModel)]="form.password"
                 name="password"
                 required>
        </div>

        <button type="submit" class="btn-primary">
          Login
        </button>

      </form>

      <p style="color:red; text-align:center; margin-top:10px;">
        {{ message }}
      </p>

      <div class="switch-text">
        Don't have an account?
        <a routerLink="/register">Register</a><br/>
    </div>
      If you are Techniqcision then must meet Admin for Login
    </div>

  </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form = {
    email: '',
    password: ''
  };

  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {

  this.http.post<any>(
    'http://localhost:5000/api/auth/login',
    this.form
  ).subscribe({
    next: (res) => {

      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);

      // ✅ FIXED LINE
      localStorage.setItem('email', this.form.email);

      if (res.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } 
      else if (res.role === 'agent') {
        this.router.navigate(['/agent/dashboard']);
      } 
      else {
        this.router.navigate(['/user/dashboard']);
      }

    },
    error: (err) => {
      this.message = err.error?.message || "Login failed";
    }
  });

}

}