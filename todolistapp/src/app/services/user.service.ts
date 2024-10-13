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
  private apiUrl = 'http://localhost:3000'; 
  private user: User | null = null; 

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  SignupUser(value: { name: string; mobile: string; email: string; password: string; }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, value).pipe(
      catchError(this.handleError)
    );
  }

  LoginByEmail(email: string, password: string): Observable<User | null> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
        map(user => {
            if (user) {
                this.setAccessToken(user.token || ''); // Call setAccessToken with the token from user
                this.setUserDetails(user); 
            }
            return user || null; 
        }),
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_Token');
      localStorage.removeItem('User'); 
    }
    this.user = null; 
    return of(void 0); 
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`); 
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
    return throwError(() => new Error(errorMessage));
  }
}
