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
        <a routerLink="/register">Register</a>
      </div>

    </div>

  </div>
  `,
  styles: [`
    .auth-wrapper {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

    .auth-card {
      background: #ffffff;
      padding: 40px;
      width: 400px;
      border-radius: 12px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    }

    h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #333;
    }

    .form-group {
      margin-bottom: 18px;
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
      color: #555;
    }

    input {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 14px;
    }

    input:focus {
      border-color: #667eea;
      outline: none;
      box-shadow: 0 0 5px rgba(102,126,234,0.4);
    }

    .btn-primary {
      width: 100%;
      padding: 12px;
      background: #667eea;
      border: none;
      color: white;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: 0.3s;
    }

    .btn-primary:hover {
      background: #5563c1;
    }

    .switch-text {
      text-align: center;
      margin-top: 20px;
    }

    .switch-text a {
      color: #667eea;
      font-weight: bold;
      text-decoration: none;
      cursor: pointer;
    }

    .switch-text a:hover {
      text-decoration: underline;
    }
  `]
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

        if (res.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (res.role === 'agent') {
          this.router.navigate(['/agent/dashboard']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }

      },
      error: (err) => {
        this.message = err.error?.message || "Login failed";
      }
    });

  }

}