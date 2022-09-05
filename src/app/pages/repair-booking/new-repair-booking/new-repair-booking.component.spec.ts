import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRepairBookingComponent } from './new-repair-booking.component';

describe('NewRepairBookingComponent', () => {
  let component: NewRepairBookingComponent;
  let fixture: ComponentFixture<NewRepairBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRepairBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRepairBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
