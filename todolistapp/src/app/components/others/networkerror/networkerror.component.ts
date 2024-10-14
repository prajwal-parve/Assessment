import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-networkerror',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './networkerror.component.html',
  styleUrls: ['./networkerror.component.css']
})
export class NetworkerrorComponent {
  
  errorMessage: string = '';
  showError: boolean = false; // To control visibility of the error message

  constructor(private http: HttpClient) {}

  handleNetworkError(error: any) {
    console.error('Network Error:', error);
    this.errorMessage = this.getUserFriendlyMessage(error);
    this.showError = true; // Show error notification
  }

  getUserFriendlyMessage(error: any): string {
    if (error.status === 404) {
      return 'The requested resource was not found.';
    } else if (error.status === 500) {
      return 'There was a server error. Please try again later.';
    } else {
      return 'An unexpected error occurred. Please try again.';
    }
  }

  closeErrorNotification() {
    this.showError = false; // Hide error notification
    this.errorMessage = ''; 
  }

  loadData() {
    this.http.get('https://api.example.com/data').subscribe({
      next: data => {
        console.log('Data received:', data);
      },
      error: error => {
        this.handleNetworkError(error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  retryRequest() {
    console.log('Retrying network request...');
    this.loadData(); 
  }
}
