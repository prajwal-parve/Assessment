import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component'; // Adjusted import path
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { UserService } from './services/user.service'; // Adjust path as necessary
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], // Add HttpClientModule to the imports
      declarations: [AppComponent],
      providers: [
        provideHttpClient(),
        { provide: UserService, useValue: jasmine.createSpyObj('UserService', ['someMethod']) }, // Adjust to your methods
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['success', 'error']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl']) },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'todolistapp' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('todolistapp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, todolistapp');
  });
});
