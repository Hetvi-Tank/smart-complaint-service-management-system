import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],   // 👈 VERY IMPORTANT
  templateUrl: './login.component.html',
  styleUrl:'./login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {

  let role = '';

  if (this.email === 'admin@gmail.com') {
    role = 'admin';
  } else if (this.email === 'agent@gmail.com') {
    role = 'agent';
  } else {
    role = 'user';
  }

  localStorage.setItem('role', role);

  this.router.navigate(['/' + role]);
}
}