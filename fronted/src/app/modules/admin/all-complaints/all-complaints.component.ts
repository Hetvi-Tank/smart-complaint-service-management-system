import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../../core/services/complaint.service';
import { Router } from '@angular/router';

@Component({
selector:'app-all-complaints',
standalone:true,
imports:[CommonModule],
templateUrl:'./all-complaints.component.html',
styleUrls:['./all-complaints.component.css']
})
export class AllComplaintsComponent implements OnInit{

complaints:any[]=[];
agents:any[]=[];

constructor(
 private complaintService:ComplaintService,
 private router:Router
){}

ngOnInit(){

this.loadComplaints();
this.loadAgents();

}

loadComplaints(){

this.complaintService.getComplaints()
.subscribe((data:any)=>{
this.complaints=data;
})

}

loadAgents(){

this.complaintService.getAgents()
.subscribe((data:any)=>{
this.agents=data;
})

}

// assignAgent(complaintId:any,agentId:any){

// const data={
// complaintId:complaintId,
// agentId:agentId
// }

// this.complaintService.assignComplaint(data)
// .subscribe((res:any)=>{

// alert(res.message);
// this.loadComplaints();

// })

// }
assignAgent(complaintId:any,agentId:any){

  const complaint = this.complaints.find(c => c._id === complaintId);

  // ❌ only Pending allowed
  if(complaint.status !== 'Pending'){
    alert("Only Pending complaints can be assigned!");
    return;
  }

  // ❌ busy agent check
  if(this.isAgentBusy(agentId)){
    alert("Agent is busy!");
    return;
  }

  const data={
    complaintId:complaintId,
    agentId:agentId
  }

  this.complaintService.assignComplaint(data)
  .subscribe((res:any)=>{

    alert(res.message);
    this.loadComplaints();

  })

}

viewComplaint(id:any){

this.router.navigate(['/admin/view-complaint',id]);

}
viewReport(id: any) {
  this.router.navigate(['/admin/view-report', id]);
}
getFilteredAgents(complaint:any){

  return this.agents.filter((a:any)=>
    a.category === complaint.category &&
    a.city === complaint.city
  );

}
isAgentBusy(agentId:any){

  return this.complaints.some((c:any)=>
    c.assignedTo?._id === agentId && c.status !== 'Completed'
  );

}
}
