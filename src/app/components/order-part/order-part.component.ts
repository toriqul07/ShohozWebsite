import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-part',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order-part.component.html',
  styleUrl: './order-part.component.css'
})
export class OrderPartComponent {
  fromCity = '';
  toCity = '';
  travelDate = '';

  constructor(private router: Router) {}

  searchBuses() {
    if (this.fromCity && this.toCity && this.travelDate) {
      this.router.navigate(['/bus-tickets/booking/bus/search'], {
        queryParams: {
          fromcity: this.fromCity,
          tocity: this.toCity,
          doj: this.travelDate,
        },
      });
    }
  }

}
