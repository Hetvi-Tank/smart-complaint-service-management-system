import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../../core/services/complaint.service';
import { Complaint } from '../../../shared/models/complaint.model';

@Component({
  selector: 'app-my-complaints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-complaints.component.html',
  styleUrls: ['./my-complaints.component.css']
})
export class MyComplaintsComponent implements OnInit {

  complaints: Complaint[] = [];

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {

    this.complaintService.getComplaints()
      .subscribe({

        next:(data:any)=>{
          this.complaints = data;
        },

        error:(err)=>{
          console.error(err);
        }

      });

  }

}