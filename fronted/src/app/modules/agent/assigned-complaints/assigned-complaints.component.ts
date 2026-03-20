import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../../core/services/complaint.service';

@Component({
  selector: 'app-assigned-complaints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assigned-complaints.component.html',
  styleUrls: ['./assigned-complaints.component.css']
})
export class AssignedComplaintsComponent implements OnInit {

  complaints:any[]=[];

  constructor(private complaintService:ComplaintService){}

  ngOnInit(){

    this.loadComplaints();

  }

  loadComplaints(){

    this.complaintService.getAgentComplaints()
    .subscribe((data:any)=>{

      this.complaints=data;

    })

  }

  changeStatus(id:any,status:any){

    this.complaintService.updateStatus({

      complaintId:id,
      status:status

    }).subscribe(()=>{

      this.loadComplaints();

    })

  }

}