import { expect } from 'chai';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/services/user.service';
import sinon from 'sinon';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  let service: UserService;
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
    localStorageMock = sinon.stub(window.localStorage, 'getItem');
  });

  afterEach(() => {
    localStorageMock.restore(); // Restore original method
  });

  it('should return access token from localStorage', () => {
    localStorageMock.withArgs('accessToken').returns('mockToken');
    const token = service.getAccessToken();
    expect(token).to.equal('mockToken');
  });

  it('should return null if localStorage is unavailable', () => {
    localStorageMock.withArgs('accessToken').returns(null);
    const token = service.getAccessToken();
    expect(token).to.be.null;
  });
});
