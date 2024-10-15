import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  userId:number;
  id?: number;          
  name: string;         
  email?: string;       
  phone?: string;       
  password: string;     
  token?: string;        
  profilePictureUrl?: string; 
  role?: string;         
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  signup(userData: User): Observable<User> {
    const url = `${this.apiUrl}/users`; 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<User>(url, userData, { headers }).pipe(
      catchError(this.handleError) 
    );
  }

  login(credentials: { email: string; password: string }): Observable<User | null> {
    const url = `${this.apiUrl}/login`; 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<User | null>(url, credentials, { headers }).pipe(
      catchError(this.handleError) 
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error; 
  }
}
