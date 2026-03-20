import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users:any[] = [];

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers()
    .subscribe((data:any)=>{
      this.users = data;
    });
  }

}