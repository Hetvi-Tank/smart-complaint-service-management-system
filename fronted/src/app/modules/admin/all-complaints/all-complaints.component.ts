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

assignAgent(complaintId:any,agentId:any){

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

}
