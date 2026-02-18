import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';

import { CreateComplaintComponent } from './create-complaint/create-complaint.component';
import { MyComplaintsComponent } from './my-complaints/my-complaints.component';

@NgModule({
  declarations: [
    CreateComplaintComponent,
    MyComplaintsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }