import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComplaintComponent } from './create-complaint/create-complaint.component';
import { MyComplaintsComponent } from './my-complaints/my-complaints.component';

const routes: Routes = [
  { path: 'create-complaint', component: CreateComplaintComponent },
  { path: 'my-complaints', component: MyComplaintsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }