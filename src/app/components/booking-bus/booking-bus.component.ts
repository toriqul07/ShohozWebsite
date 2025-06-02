import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface BoardingPoint {
  name: string;
  time: string; // e.g., "09:30 AM"
  address: string;
}

@Component({
  selector: 'app-booking-bus',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FooterComponent],
  templateUrl: './booking-bus.component.html',
  styleUrl: './booking-bus.component.css'
})
export class BookingBusComponent implements OnInit {
 buses: any[] = [];
 originalBuses: any[] = [];
  boardingPoints: BoardingPoint[] = []; 
  fromCity: string = '';
  toCity: string = '';
  doj: string = '';
  selectedBoardingPoint: BoardingPoint | undefined;
  // Modal related properties
  selectedTicket: any | undefined; 
  //sorting and filtering properties
   loading = false;
  error = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  seats: string[] = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4',
    'E1', 'E2', 'E3', 'E4', 'F1', 'F2', 'F3', 'F4', 'G1', 'G2', 'G3', 'G4', 'H1', 'H2', 'H3', 'H4', 'I1', 'I2', 'I3', 'I4',
    'J1', 'J2', 'J3', 'J4'];
    s2: string[] = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4',
    'E1', 'E2', 'E3', 'E4', 'F1', 'F2', 'F3', 'F4', 'G1', 'G2', 'G3', 'G4', 'H1', 'H2', 'H3', 'H4', 'I1', 'I2', 'I3', 'I4',
    'J1', 'J2', 'J3', 'J4'];
  selectedSeats: string[] = []; 
  maxSelectableSeats: number = 4; 


  bookedSeats: string[] = ['A2', 'B3', 'C1', 'D4'];
  constructor(private route: ActivatedRoute, private busService: BusService,private modalService: NgbModal,private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fromCity = params['fromcity'];
      this.toCity = params['tocity'];
      this.doj = params['doj'];

      this.busService.getBuses().subscribe(data => {
        this.originalBuses = [...data]; // Store a copy of the original data
        this.buses = [...data]; // Initialize displayed buses with original data
        this.sortBuses(this.sortOrder); // Apply initial sort (default asc)
        //console.log(this.buses);
      }); 
      this.busService.getAllBoradingPoint().subscribe(data => {
        this.boardingPoints = data;
        //console.log(this.allBoardingPoints); 
      });
    });
    // this.generateSeats();
  }
  // Method to sort buses based on price
  sortBuses(order: 'asc' | 'desc'): void {
    this.sortOrder = order; // Update the current sort order
    if (this.buses) {
      this.buses.sort((a, b) => {
        if (order === 'asc') {
          return a.price - b.price; // Low to High
        } else {
          return b.price - a.price; // High to Low
        }
      });
    }
  }
  openModal(content: any, bus: any) {
    this.selectedTicket = bus;
    this.seats = this.selectedTicket.seats; // Assuming seats are part of the ticket object
    this.selectedSeats = [];
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  
  // Checks if a seat is currently selected by the user
  isSeatSelected(seat: string): boolean {
    return this.selectedSeats.includes(seat);
  }
   // Checks if a seat is already booked/sold
  isSeatBooked(seat: string): boolean {
    return this.bookedSeats.includes(seat);
  }
  
  // Toggles the selection of a seat
  toggleSeatSelection(seat: string): void {
    if (this.isSeatBooked(seat)) {
      return; // Cannot select booked seats
    }

    const index = this.selectedSeats.indexOf(seat);
    if (index > -1) {
      // Seat is already selected, deselect it
      this.selectedSeats.splice(index, 1);
    } else {
      // Seat is not selected, select it if max selectable seats not reached
      if (this.selectedSeats.length < this.maxSelectableSeats) {
        this.selectedSeats.push(seat);
      } else {
        alert(`You can select a maximum of ${this.maxSelectableSeats} seats.`);
      }
    }
  }

  // Modified: Close seat modal and open boarding point modal
  onContinueBooking(boardingPointModalContent: any): void {
    if (this.selectedTicket && this.selectedSeats.length > 0) {
      // Close the current (seat selection) modal
      this.modalService.dismissAll();

      // Open the next modal (boarding point selection)
      this.modalService.open(boardingPointModalContent, { size: 'lg', centered: true });
    } else {
      alert('Please select at least one seat.');
    }
  }
  // --- Boarding Point Modal Methods ---
  selectBoardingPoint(point: BoardingPoint): void {
    this.selectedBoardingPoint = point;
  }

  isBoardingPointSelected(point: BoardingPoint): boolean {
    return this.selectedBoardingPoint === point;
  }
  onContinueBoarding(): void {
    if (this.selectedBoardingPoint && this.selectedTicket && this.selectedSeats.length > 0) {
      console.log('Selected Boarding Point:', this.selectedBoardingPoint);
      this.modalService.dismissAll(); // Close the current modal

      // Package all necessary data to pass to the next route
      // Make sure the properties match what TripInfoComponent expects
      const tripDetailsForNavigation = {
        id: this.selectedTicket.id, // Assuming selectedTicket has an 'id'
        paribahonName: this.selectedTicket.paribahonName,
        paribahonType: this.selectedTicket.paribahonType,
        price: this.selectedTicket.price,
        startingTime: this.selectedTicket.startingTime,
        endingTime: this.selectedTicket.endingTime,
        fromCity: this.fromCity,
        toCity: this.toCity,
        doj: this.doj
      };

      this.router.navigate(['bus-tickets/booking/bus/trip-info'], {
        queryParams: {
          ticketDetails: JSON.stringify(tripDetailsForNavigation),
          selectedSeats: JSON.stringify(this.selectedSeats),
          boardingPoint: JSON.stringify(this.selectedBoardingPoint)
        }
      });

    } else {
      alert('Please select a boarding point.');
    }
  }

  // A method to go back from Boarding Point modal to Seat Selection modal
  goBackToSeatSelection(seatSelectionModalContent: any): void {
    this.modalService.dismissAll(); // Close current modal
    this.modalService.open(seatSelectionModalContent, { size: 'lg', centered: true }); // Re-open previous modal
  }
}
