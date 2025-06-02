import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingBusComponent } from './booking-bus.component';

describe('BookingBusComponent', () => {
  let component: BookingBusComponent;
  let fixture: ComponentFixture<BookingBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingBusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
