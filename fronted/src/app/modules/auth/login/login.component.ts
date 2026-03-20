import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form = {
    email: '',
    password: ''
  };

  message: string = '';
 showPassword = false;

togglePassword(){
  this.showPassword = !this.showPassword;
}

  constructor(private http: HttpClient, private router: Router) {}

 login() {

  const loginData = {
    email: this.form.email.toLowerCase(),
    password: this.form.password
  };

  this.http.post<any>(
    'http://localhost:5000/api/auth/login',
    loginData
  ).subscribe({
    next: (res) => {

      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('email', loginData.email);
      localStorage.setItem('name', res.name);

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