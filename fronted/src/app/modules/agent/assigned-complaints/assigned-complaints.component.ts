import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="page">
    <h2>Assigned Complaints</h2>

    <table>
      <tr>
        <th>User</th>
        <th>Title</th>
        <th>Status</th>
      </tr>
      <tr>
        <td>User 1</td>
        <td>Water Issue</td>
        <td>Pending</td>
      </tr>
    </table>
  </div>
  `,
  styles: [`
    .page { padding:40px; }
    table { width:100%; border-collapse: collapse; }
    th, td { border:1px solid #ddd; padding:10px; }
    th { background:#3498db; color:white; }
  `]
})
export class AssignedComplaintsComponent {}