import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPartComponent } from './order-part.component';

describe('OrderPartComponent', () => {
  let component: OrderPartComponent;
  let fixture: ComponentFixture<OrderPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
