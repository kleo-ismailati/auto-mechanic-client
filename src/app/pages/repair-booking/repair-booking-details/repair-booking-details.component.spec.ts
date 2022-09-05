import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBookingDetailsComponent } from './repair-booking-details.component';

describe('RepairBookingDetailsComponent', () => {
  let component: RepairBookingDetailsComponent;
  let fixture: ComponentFixture<RepairBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairBookingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
