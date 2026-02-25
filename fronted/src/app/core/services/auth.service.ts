import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  // ✅ REGISTER
  register(data: any) {
    return this.http.post(this.API + '/register', data);
  }

  // ✅ LOGIN
  login(data: any) {
    return this.http.post<any>(this.API + '/login', data);
  }

  // ✅ SAVE USER
  saveUser(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('name', data.name);
  }

  logout() {
    localStorage.clear();
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}