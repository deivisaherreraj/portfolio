import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedServicesComponent } from './offered-services.component';

describe('OfferedServicesComponent', () => {
  let component: OfferedServicesComponent;
  let fixture: ComponentFixture<OfferedServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferedServicesComponent]
    });
    fixture = TestBed.createComponent(OfferedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
