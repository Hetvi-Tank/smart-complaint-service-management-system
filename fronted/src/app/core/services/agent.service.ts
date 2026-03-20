import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  API = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  getHeaders() {

    const token = localStorage.getItem("token");

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

  }

  getAssignedComplaints() {

    return this.http.get<any[]>(
      this.API + "/agents/assigned-complaints",
      this.getHeaders()
    );

  }

}