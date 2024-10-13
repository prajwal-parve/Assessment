import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/environments/environment'; 
import { User } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/shared/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl; // Use environment variable
  private user: User | null = null; 

  constructor(private http: HttpClient) { }

  SignupUser(value: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, value).pipe(
      catchError(this.handleError)
    );
  }

  LoginByEmail(email: string, password: string): Observable<User | null> {
    return this.http.post<User[]>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(users => users.find(user => user.email === email && user.password === password) || null), // Return a single user or null
      catchError(this.handleError)
    );
  }

  setUserDetails(userData: User): void {
    this.user = userData;
  }

  getUserDetails(): User | null {
    return this.user;
  }

  logout(): Observable<void> {
    localStorage.removeItem('accessToken');
    return of(void 0); 
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4200/user');
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
