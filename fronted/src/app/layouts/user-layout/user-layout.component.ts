import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink,Router } from '@angular/router';


@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})

export class UserLayoutComponent {

  username = "";
  menuOpen = false;
    constructor(private router: Router) {}  
  ngOnInit() {
    this.username = localStorage.getItem('name') || "User";
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
 changePassword(){

    // common change password page
    this.router.navigate(['/change-password']);

  }

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  goToDashboard() {
  this.router.navigate(['/user/dashboard']);
}

}