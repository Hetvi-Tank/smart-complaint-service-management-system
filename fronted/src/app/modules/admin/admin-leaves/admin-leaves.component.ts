import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-leaves',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-leaves.component.html',
  styleUrl: './admin-leaves.component.css'
})
export class AdminLeavesComponent {
leaves:any[] = [];

ngOnInit(){
  this.loadLeaves();
}

loadLeaves(){
  this.http.get('http://localhost:5000/api/agents/all-leaves')
  .subscribe((data:any)=>{
    this.leaves = data;
  });
}

updateLeave(id:any,status:string){

  this.http.put(`http://localhost:5000/api/agents/leave-action/${id}`,{status})
  .subscribe((res:any)=>{
    alert(res.message);
    this.loadLeaves();
  });

}
constructor(private http: HttpClient) {}
}
