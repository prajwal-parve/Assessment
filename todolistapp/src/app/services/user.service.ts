import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = environment.apiUrl; // Use environment variable for API URL
  private user: User | null = null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.loadUserFromLocalStorage(); // Load user data from local storage on service initialization
  }

  private loadUserFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('User');
      this.user = userData ? JSON.parse(userData) : null; // Initialize user from local storage if available
    }
  }

  SignupUser(value: { name: string; mobile: string; email: string; password: string; }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, value).pipe(
      map(user => {
        this.setUserDetails(user); // Store user data upon signup
        return user;
      }),
      catchError(this.handleError)
    );
  }

  LoginByEmail(email: string, password: string): Observable<User | null> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(user => {
        if (user) {
          this.setAccessToken(user.token || ''); // Store access token
          this.setUserDetails(user); // Store user details
        }
        return user || null;
      }),
      catchError(this.handleError)
    );
  }

  setUserDetails(userData: User): void {
    this.user = userData;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('User', JSON.stringify(userData)); // Store user data in local storage
    }
  }

  getUserDetails(): User | null {
    return this.user;
  }

  logout(): Observable<void> {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_Token');
      localStorage.removeItem('User');
    }
    this.user = null;
    return of(void 0);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      catchError(this.handleError)
    );
  }

  getAccessToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_Token');
    }
    return null;
  }

  setAccessToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_Token', token);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('UserService Error: ', errorMessage); // Log error for debugging
    return throwError(() => new Error(errorMessage));
  }
}
