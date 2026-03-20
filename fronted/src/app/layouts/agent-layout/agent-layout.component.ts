import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './agent-layout.component.html',
  styleUrls: ['./agent-layout.component.css']
})
export class AgentLayoutComponent implements OnInit {

  username = "Agent";
  menuOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {

    const name = localStorage.getItem('name');

    if(name){
      this.username = name;
    }

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

    this.router.navigate(['/login']);

  }

}