// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://loccalhost:4200'; 

  constructor(private http: HttpClient) {}

  // Method to sign up a new user
  signup(userData: any): Observable<any> {
    const url = `${this.apiUrl}/signup`; 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, userData, { headers });
  }

  // Method to log in an existing user
  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login`; 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, credentials, { headers });
  }

  // Method to log out the user (optional)
  logout(): void {
    // Implement logout logic, like removing tokens from localStorage
    localStorage.removeItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    // Check if token exists or some other logic
    return !!localStorage.getItem('token');
  }
}
