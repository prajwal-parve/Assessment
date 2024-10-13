import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkerrorComponent } from './networkerror.component';

describe('NetwrokerrorComponent', () => {
  let component: NetworkerrorComponent;
  let fixture: ComponentFixture<NetworkerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkerrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
