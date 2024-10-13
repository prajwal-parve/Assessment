import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css'] 
})
export class NotfoundComponent {
  constructor(private router: Router) {}

  
  goHome() {
    this.router.navigate(['/']); 
  }
}
