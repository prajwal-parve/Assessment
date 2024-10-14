import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NetworkerrorComponent } from './networkerror.component';

describe('NetworkerrorComponent', () => {
  let component: NetworkerrorComponent;
  let fixture: ComponentFixture<NetworkerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, NetworkerrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle network error and set errorMessage', () => {
    const mockError = { status: 404 }; // Mocking a 404 error
    component.handleNetworkError(mockError);
    expect(component.errorMessage).toBe('The requested resource was not found.');
    expect(component.showError).toBe(true); // Ensure error message is shown
  });

  it('should close error notification', () => {
    component.showError = true; // Simulate that error message is shown
    component.closeErrorNotification();
    expect(component.showError).toBe(false); // Ensure the error message is hidden
    expect(component.errorMessage).toBe(''); // Ensure the error message is cleared
  });

  it('should retry network request and call loadData', () => {
    spyOn(component, 'loadData'); // Spy on loadData method
    component.retryRequest(); // Call the retry method
    expect(component.loadData).toHaveBeenCalled(); // Check if loadData was called
  });

  it('should get user-friendly message for different error statuses', () => {
    expect(component.getUserFriendlyMessage({ status: 404 })).toBe('The requested resource was not found.');
    expect(component.getUserFriendlyMessage({ status: 500 })).toBe('There was a server error. Please try again later.');
    expect(component.getUserFriendlyMessage({ status: 0 })).toBe('An unexpected error occurred. Please try again.');
  });
});
