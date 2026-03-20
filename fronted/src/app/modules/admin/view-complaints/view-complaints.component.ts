// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-view-complaints',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './view-complaints.component.html',
//   styleUrls: ['./view-complaints.component.css']
// })
// export class ViewComplaintsComponent implements OnInit {

//   complaints: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit() {

//     this.http.get<any>('http://localhost:5000/api/complaints/all')
//       .subscribe(res => {

//         console.log(res);
        
//         this.complaints = res;

//       });

//   }

// }

import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComplaintService } from '../../../core/services/complaint.service';

@Component({
selector:'app-view-complaint',
standalone:true,
imports:[CommonModule],
templateUrl:'./view-complaints.component.html',
styleUrls:['./view-complaints.component.css']
})
export class ViewComplaintsComponent implements OnInit{

complaint:any;
agents:any[]=[];

constructor(
 private route:ActivatedRoute,
 private complaintService:ComplaintService
){}

ngOnInit(){

const id=this.route.snapshot.paramMap.get("id");

this.loadComplaint(id);
this.loadAgents();

}

loadComplaint(id:any){

this.complaintService.getComplaints()
.subscribe((data:any)=>{
this.complaint=data.find((c:any)=>c._id===id);
})

}

loadAgents(){

this.complaintService.getAgents()
.subscribe((data:any)=>{
this.agents=data;
})

}

assignAgent(agentId:any){

const data={
complaintId:this.complaint._id,
agentId:agentId
}

this.complaintService.assignComplaint(data)
.subscribe((res:any)=>{

alert(res.message);
this.loadComplaint(this.complaint._id);

})

}

}