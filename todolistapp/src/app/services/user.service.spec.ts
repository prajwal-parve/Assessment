import { expect } from 'chai';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/services/user.service';
import sinon from 'sinon';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController; // Add HttpTestingController
  let localStorageMock: sinon.SinonStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController); // Inject HttpTestingController
    localStorageMock = sinon.stub(window.localStorage, 'getItem');
    sinon.stub(window.localStorage, 'setItem'); // Stub for setItem
    sinon.stub(window.localStorage, 'removeItem'); // Stub for removeItem
  });

  afterEach(() => {
    localStorageMock.restore(); // Restore original method
    sinon.restore(); // Restore all sinon stubs
    httpTestingController.verify(); // Ensure there are no outstanding requests
  });

  it('should return access token from localStorage', () => {
    localStorageMock.withArgs('access_Token').returns('mockToken');
    const token = service.getAccessToken();
    expect(token).to.equal('mockToken');
  });

  it('should return null if localStorage is unavailable', () => {
    localStorageMock.withArgs('access_Token').returns(null);
    const token = service.getAccessToken();
    expect(token).to.be.null;
  });

  it('should store user details in localStorage on signup', () => {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', password: 'password', token: 'mockToken' };
    service.setUserDetails(user);
    const storedUser = JSON.parse(window.localStorage.getItem('User') || '{}');
    expect(storedUser).to.deep.equal(user);
  });

  it('should return user details from localStorage', () => {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', password: 'password', token: 'mockToken' };
    localStorageMock.withArgs('User').returns(JSON.stringify(user));
    service['loadUserFromLocalStorage'](); // Manually trigger loading user data
    const returnedUser = service.getUserDetails();
    expect(returnedUser).to.deep.equal(user);
  });

  it('should call the API and return user on successful login', (done) => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', token: 'mockToken' };
    service.LoginByEmail('john@example.com', 'password').subscribe(user => {
      expect(user).to.deep.equal(mockUser);
      expect(service.getAccessToken()).to.equal('mockToken'); // Check if the token was set
      done();
    });

    // Expect the HTTP request to have been made
    const req = httpTestingController.expectOne('http://localhost:3000/login');
    expect(req.request.method).to.equal('POST');
    req.flush(mockUser); // Respond with mock user
  });

  it('should handle API errors gracefully', (done) => {
    service.LoginByEmail('wrong@example.com', 'wrongPassword').subscribe({
      next: () => {
        expect.fail('Expected an error, but got a user');
      },
      error: (error) => {
        expect(error.message).to.equal('Login failed');
        done();
      }
    });

    // Expect the HTTP request to have been made
    const req = httpTestingController.expectOne('http://localhost:3000/login');
    expect(req.request.method).to.equal('POST');
    req.flush('Login failed', { status: 401, statusText: 'Unauthorized' }); // Respond with an error
  });

  it('should remove access token and user from localStorage on logout', (done) => {
    // First set a token and user
    window.localStorage.setItem('access_Token', 'mockToken');
    window.localStorage.setItem('User', JSON.stringify({ id: 1, name: 'John Doe' }));

    service.logout().subscribe(() => {
      expect(window.localStorage.getItem('access_Token')).to.be.null; // Check if token is removed
      expect(window.localStorage.getItem('User')).to.be.null; // Check if user is removed
      done(); // Signal that the async test is complete
    });
  });
});
