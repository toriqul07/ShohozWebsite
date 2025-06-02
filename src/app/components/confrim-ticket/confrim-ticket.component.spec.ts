import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimTicketComponent } from './confrim-ticket.component';

describe('ConfrimTicketComponent', () => {
  let component: ConfrimTicketComponent;
  let fixture: ComponentFixture<ConfrimTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfrimTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfrimTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
