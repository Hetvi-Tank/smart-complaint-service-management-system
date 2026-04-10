// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ComplaintService } from '../../../core/services/complaint.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css']
// })
// export class AdminDashboardComponent implements OnInit {

//   complaints:any[] = [];

//   total = 0;
//   pending = 0;
//   assigned = 0;
//   completed = 0;

//   constructor(
//     private complaintService:ComplaintService,
//     private router:Router
//   ){}

//   ngOnInit(): void {
//     this.loadComplaints();
//   }

//   loadComplaints(){

//     this.complaintService.getComplaints()
//     .subscribe((data:any)=>{

//       this.complaints = data;

//       this.total = data.length;

//       this.pending = data.filter((c:any)=>c.status==="Pending").length;

//       this.assigned = data.filter((c:any)=>c.status==="Assigned").length;

//       this.completed = data.filter((c:any)=>c.status==="Completed").length;

//     });

//   }

//   viewComplaint(id:any){
//     this.router.navigate(['/admin/view-complaint',id]);
//   }
//   viewReport(id: any) {
//   this.router.navigate(['/admin/view-report', id]);
// }

// }

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../../core/services/complaint.service';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  complaints: any[] = [];

  total = 0;
  pending = 0;
  assigned = 0;
  completed = 0;

  complaintChart: any;
  pieChart: any;

  constructor(
    private complaintService: ComplaintService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  ngAfterViewInit(): void {
    // empty rakho (chart baad me load hoga)
  }

  loadComplaints() {

  this.complaintService.getComplaints()
    .subscribe((data: any) => {

      this.complaints = data;

      // ✅ STATUS COUNT (DB based)
      this.total = data.length;
      this.pending = data.filter((c:any)=>c.status==="Pending").length;
      this.assigned = data.filter((c:any)=>c.status==="Assigned").length;
      this.completed = data.filter((c:any)=>c.status==="Completed").length;

      // ✅ CHART (DB based)
      this.loadCharts();

    });

}
loadCharts() {

  // destroy old charts
  if (this.complaintChart) this.complaintChart.destroy();
  if (this.pieChart) this.pieChart.destroy();

  // =========================
  // ✅ CATEGORY WISE LOGIC
  // =========================

  const categoryMap: any = {};

  this.complaints.forEach((c: any) => {
    const cat = c.category || "Other";

    if (categoryMap[cat]) {
      categoryMap[cat]++;
    } else {
      categoryMap[cat] = 1;
    }
  });

  const categoryLabels = Object.keys(categoryMap);
  const categoryData = Object.values(categoryMap);

  // CATEGORY BAR CHART
  this.complaintChart = new Chart("complaintChart", {
    type: 'bar',
    data: {
      labels: categoryLabels,
      datasets: [{
        label: 'Category-wise Complaints',
        data: categoryData,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });

  // =========================
  // ✅ STATUS WISE LOGIC
  // =========================

  this.pieChart = new Chart("pieChart", {
    type: 'pie',
    data: {
      labels: ['Pending', 'Assigned', 'Completed'],
      datasets: [{
        data: [this.pending, this.assigned, this.completed]
      }]
    }
  });

}

  viewComplaint(id: any) {
    this.router.navigate(['/admin/view-complaint', id]);
  }

  viewReport(id: any) {
    this.router.navigate(['/admin/view-report', id]);
  }

}