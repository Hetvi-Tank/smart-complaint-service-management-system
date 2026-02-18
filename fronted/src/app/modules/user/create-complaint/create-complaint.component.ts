import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-complaint',
 

  templateUrl: './create-complaint.component.html',
  styleUrl: './create-complaint.component.css'
})
export class CreateComplaintComponent {

  complaint = {
    title: '',
    description: ''
  };

  submitComplaint() {
    console.log(this.complaint);
  }
}
