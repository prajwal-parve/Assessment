import { expect } from 'chai';
import { UserService } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/services/user.service'; // Adjust the import path if needed
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import sinon from 'sinon';
import { PLATFORM_ID } from '@angular/core';
import { User } from '../shared/user'; // Adjust the path based on your structure

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  let localStorageGetItemStub: sinon.SinonStub;
  let localStorageSetItemStub: sinon.SinonStub;
  let localStorageRemoveItemStub: sinon.SinonStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        provideHttpClientTesting() // Updated line
      ]
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);

    localStorageGetItemStub = sinon.stub(window.localStorage, 'getItem');
    localStorageSetItemStub = sinon.stub(window.localStorage, 'setItem');
    localStorageRemoveItemStub = sinon.stub(window.localStorage, 'removeItem');
  });

  afterEach(() => {
    localStorageGetItemStub.restore();
    localStorageSetItemStub.restore();
    localStorageRemoveItemStub.restore();
    httpTestingController.verify(); // Ensure there are no outstanding requests
  });

  it('should return access token from localStorage', () => {
    localStorageGetItemStub.withArgs('access_Token').returns('mockToken');
    const token = service.getAccessToken();
    expect(token).to.equal('mockToken');
  });

  it('should return null if localStorage is unavailable', () => {
    localStorageGetItemStub.withArgs('access_Token').returns(null);
    const token = service.getAccessToken();
    expect(token).to.be.null;
  });

  it('should store user details in localStorage on signup', () => {
    const user: User = {
      userId: 1,
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'password',
      token: 'mockToken'
    };

    service.setUserDetails(user);
    expect(localStorageSetItemStub).to.have.been.calledWith('User', JSON.stringify(user)); // Ensure sinon is set up correctly
  });

  it('should return user details from localStorage', () => {
    const user: User = {
      userId: 1,
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'password',
      token: 'mockToken'
    };

    localStorageGetItemStub.withArgs('User').returns(JSON.stringify(user));
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

    const req = httpTestingController.expectOne('http://localhost:3000/login');
    expect(req.request.method).to.equal('POST');
    req.flush('Login failed', { status: 401, statusText: 'Unauthorized' }); // Respond with an error
  });

  it('should remove access token and user from localStorage on logout', (done) => {
    localStorageSetItemStub.withArgs('access_Token', 'mockToken');
    localStorageSetItemStub.withArgs('User', JSON.stringify({ id: 1, name: 'John Doe' }));

    service.logout().subscribe(() => {
      expect(localStorageRemoveItemStub).to.have.been.calledWith('access_Token'); // Check if token is removed
      expect(localStorageRemoveItemStub).to.have.been.calledWith('User'); // Check if user is removed
      done(); 
    });
  });
});
