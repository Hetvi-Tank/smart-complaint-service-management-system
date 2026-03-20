import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../../core/services/complaint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  complaints:any[] = [];

  total = 0;
  pending = 0;
  assigned = 0;
  completed = 0;

  constructor(
    private complaintService:ComplaintService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(){

    this.complaintService.getComplaints()
    .subscribe((data:any)=>{

      this.complaints = data;

      this.total = data.length;

      this.pending = data.filter((c:any)=>c.status==="Pending").length;

      this.assigned = data.filter((c:any)=>c.status==="Assigned").length;

      this.completed = data.filter((c:any)=>c.status==="Completed").length;

    });

  }

  viewComplaint(id:any){
    this.router.navigate(['/admin/view-complaint',id]);
  }

}