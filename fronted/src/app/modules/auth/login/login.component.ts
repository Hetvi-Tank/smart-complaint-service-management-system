import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: any = {};
  message = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {

    this.auth.login(this.form).subscribe({

      next: (res: any) => {

        // Save token + role
        this.auth.saveUser(res);

        // Redirect user
        if (res.role === 'user') {
          this.router.navigate(['/user/dashboard']);
        }

      },

      error: (err: any) => {
        this.message = err.error?.msg || 'Login Failed';
      }

    });

  }
}