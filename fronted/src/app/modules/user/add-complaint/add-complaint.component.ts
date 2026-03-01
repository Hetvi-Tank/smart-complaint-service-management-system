import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent {

  title: string = '';
  description: string = '';
  category: string = '';
  priority: string = '';
  address: string = '';
  area: string = '';
  city: string = '';

  selectedFile: File | null = null;
  message: string = '';

  categories = ['Security Service','Public Utility', 'Electrical', 'Plumbing'];

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submit() {

    this.message = '';

    if (
      !this.title ||
      !this.description ||
      !this.category ||
      !this.priority ||
      !this.address ||
      !this.area ||
      !this.city
    ) {
      this.message = "Please fill all required fields!";
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('category', this.category);
    formData.append('priority', this.priority);
    formData.append('address', this.address);
    formData.append('area', this.area);
    formData.append('city', this.city);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const token = localStorage.getItem('token');

    this.http.post(
      'http://localhost:5000/api/complaints/create',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: () => {
        this.message = "Complaint Submitted Successfully!";
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        this.message = "Error submitting complaint!";
      }
    });
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.category = '';
    this.priority = '';
    this.address = '';
    this.area = '';
    this.city = '';
    this.selectedFile = null;
  }
}