import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,   // ✅ IMPORTANT
  imports: [CommonModule, FormsModule],  // ✅ IMPORTANT
  templateUrl: './register.component.html',
   styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: any = {};
  message = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {

    this.auth.register(this.form).subscribe({

      next: (res: any) => {
        this.message = 'Registration Successful';
        this.router.navigate(['/login']);
      },

      error: (err: any) => {
        this.message = err.error?.msg || 'Error Occurred';
      }

    });

  }
}