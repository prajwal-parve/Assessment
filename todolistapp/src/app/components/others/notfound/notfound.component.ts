import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
  constructor(private router: Router) {}

  // Method to navigate back to the homepage
  goHome(): void {
    this.router.navigate(['/']); 
  }
}
