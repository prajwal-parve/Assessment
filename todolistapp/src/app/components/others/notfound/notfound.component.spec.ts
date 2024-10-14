import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotfoundComponent } from './notfound.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NotfoundComponent', () => {
  let component: NotfoundComponent;
  let fixture: ComponentFixture<NotfoundComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotfoundComponent],
      // If using Router, you might want to provide a mock implementation or NO_ERRORS_SCHEMA
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on goHome()', () => {
    // Create a mock router
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    component = new NotfoundComponent(routerSpy); // Use the mock router

    component.goHome(); // Call the method

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']); // Verify navigation
  });
});
