// import { Injectable } from '@angular/core';
// import { Complaint } from '../../shared/models/complaint.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ComplaintService {

//   private complaints: Complaint[] = [];

//   constructor() { }

//   addComplaint(complaint: Complaint) {
//     complaint.id = Date.now().toString();
//     this.complaints.push(complaint);
//   }

//   getComplaints(): Complaint[] {
//     return this.complaints;
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  API = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  getHeaders(){

    const token = localStorage.getItem("token");

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

  }

  // ADMIN → ALL COMPLAINTS
  getComplaints(){

    return this.http.get<any[]>(
      this.API + "/complaints",
      this.getHeaders()
    );

  }

  // AGENT → ASSIGNED COMPLAINTS
  getAgentComplaints(){

    return this.http.get<any[]>(
      this.API + "/agents/assigned-complaints",
      this.getHeaders()
    );

  }

  // ADMIN → GET AGENTS
  getAgents(){

    return this.http.get<any[]>(
      this.API + "/admin/agents",
      this.getHeaders()
    );

  }

  // ADMIN → ASSIGN COMPLAINT
  assignComplaint(data:any){

    return this.http.post(
      this.API + "/admin/assign-complaint",
      data,
      this.getHeaders()
    );

  }

  // AGENT → UPDATE STATUS
  updateStatus(data:any){

    return this.http.put(
      this.API + "/agents/update-status",
      data,
      this.getHeaders()
    );

  }

}