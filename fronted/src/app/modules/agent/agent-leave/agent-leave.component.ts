import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agent-leave',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agent-leave.component.html',
  styleUrl: './agent-leave.component.css'
})
export class AgentLeaveComponent {

  leave = {
  reason: '',
  description: '',
  fromDate: '',
  toDate: ''
};

constructor(private http: HttpClient) {}

// submitLeave(){

//   const token = localStorage.getItem('token');

//   this.http.post('http://localhost:5000/api/agents/apply-leave', this.leave, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }).subscribe((res:any)=>{
//     alert(res.message);
//   });

// }

submitLeave() {

  const token = localStorage.getItem('token');

  this.http.post('http://localhost:5000/api/agents/apply-leave', this.leave, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).subscribe({
    
    // ✅ SUCCESS
    next: (res: any) => {
      alert("✅ " + res.message);

      // form reset (optional but pro)
      this.leave = {
        reason: '',
        description: '',
        fromDate: '',
        toDate: ''
      };
    },

    // ❌ ERROR (IMPORTANT)
    error: (err) => {
      if (err.status === 400) {
        alert("⚠️ " + err.error.message); // 🔥 your custom backend message
      } else {
        alert("❌ Something went wrong");
      }
    }

  });

}
}
