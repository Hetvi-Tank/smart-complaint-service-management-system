import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form = {
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    area: '',
    city: ''
  };

  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {

    this.http.post<any>('http://localhost:5000/api/auth/register', this.form)
      .subscribe({
        next: () => {
          alert("Registered Successfully");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.message = err.error?.message || "Registration failed";
        }
      });

  }

}