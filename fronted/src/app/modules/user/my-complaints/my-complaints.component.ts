import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../../core/services/complaint.service';
import { Complaint } from '../../../shared/models/complaint.model';

@Component({
  selector: 'app-my-complaints',
  templateUrl: './my-complaints.component.html',
  styleUrls: ['./my-complaints.component.css']
})
export class MyComplaintsComponent implements OnInit {

  complaints: Complaint[] = [];

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.complaints = this.complaintService.getComplaints();
  }
}
