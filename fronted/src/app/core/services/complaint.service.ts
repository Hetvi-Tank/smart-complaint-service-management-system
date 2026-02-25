import { Injectable } from '@angular/core';
import { Complaint } from '../../shared/models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private complaints: Complaint[] = [];

  constructor() { }

  addComplaint(complaint: Complaint) {
    complaint.id = Date.now().toString();
    this.complaints.push(complaint);
  }

  getComplaints(): Complaint[] {
    return this.complaints;
  }
}
