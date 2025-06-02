import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { catchError, of } from 'rxjs';

// Interfaces for the data received
interface TicketDetails {
  id: number;
  paribahonName: string;
  paribahonType: string;
  price: number;
  startingTime: number;
  endingTime: number;
  fromCity: string;
  toCity: string;
  doj: string; // Date of Journey
}
// NEW INTERFACE: TicketDetails specifically for the payload (without ID)
// This interface is used for the `ticketDetails` property within the `BookingConfirmationPayload`
interface TicketDetailsForPayload {
  paribahonName: string;
  paribahonType: string;
  price: number;
  startingTime: number;
  endingTime: number;
  fromCity: string;
  toCity: string;
  doj: string; // Date of Journey
}
interface BoardingPointDetails {
  name: string;
  time: string;
  address: string;
}

interface PassengerDetails {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | '';
}
// Update BookingConfirmationPayload to use TicketDetailsForPayload
interface BookingConfirmationPayload {
  ticketDetails: TicketDetailsForPayload; // Use the new interface here
  selectedSeats: string[];
  boardingPoint: BoardingPointDetails;
  mobileNumber: string;
  email: string;
  passengerDetails: PassengerDetails;
}
@Component({
  selector: 'app-confrim-ticket',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FooterComponent],
  templateUrl: './confrim-ticket.component.html',
  styleUrl: './confrim-ticket.component.css'
})
export class ConfrimTicketComponent implements OnInit{
   ticketDetails: TicketDetails | undefined;
  selectedSeats: string[] = [];
  boardingPoint: BoardingPointDetails | undefined;
  mobileNumber: string = '';
  email: string = '';
  passengerDetails: PassengerDetails | undefined; // CHANGE THIS LINE: from array to single object
  showConfirmationModal: boolean = false;
   bookingStatusMessage: string = '';
  isBookingSuccess: boolean = false;

  constructor(private route: ActivatedRoute,private busService: BusService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['ticketDetails']) {
        this.ticketDetails = JSON.parse(params['ticketDetails']);
      }
      if (params['selectedSeats']) {
        this.selectedSeats = JSON.parse(params['selectedSeats']);
      }
      if (params['boardingPoint']) {
        this.boardingPoint = JSON.parse(params['boardingPoint']);
      }
      if (params['mobileNumber']) {
        this.mobileNumber = params['mobileNumber'];
      }
      if (params['email']) {
        this.email = params['email'];
      }
      if (params['passengerDetails']) {
        // Parse directly into a single object, not an array
        this.passengerDetails = JSON.parse(params['passengerDetails']);
      }
      // console.log('Confirmation Info:', this.ticketDetails, this.selectedSeats, this.boardingPoint, this.mobileNumber, this.email, this.passengerDetails);
    });
  }

  finalizeBooking(): void {
     // Perform all checks at the beginning
    if (!this.ticketDetails || !this.selectedSeats || this.selectedSeats.length === 0 ||
        !this.boardingPoint || !this.mobileNumber || !this.email || !this.passengerDetails) {
      this.bookingStatusMessage = 'Missing booking details. Please go back and complete the form.';
      this.isBookingSuccess = false;
      this.showConfirmationModal = true;
      return;
    }

    // We can confidently create the payload.

    const ticketDetailsForPayload: TicketDetailsForPayload = {
      paribahonName: this.ticketDetails.paribahonName,
      paribahonType: this.ticketDetails.paribahonType,
      price: this.ticketDetails.price,
      startingTime: this.ticketDetails.startingTime,
      endingTime: this.ticketDetails.endingTime,
      fromCity: this.ticketDetails.fromCity,
      toCity: this.ticketDetails.toCity,
      doj: this.ticketDetails.doj 
    };

    const bookingPayload: BookingConfirmationPayload = {
      ticketDetails: ticketDetailsForPayload,
      selectedSeats: this.selectedSeats,
      boardingPoint: this.boardingPoint, 
      mobileNumber: this.mobileNumber,
      email: this.email,
      passengerDetails: this.passengerDetails 
    };
    this.busService.createBookingConfirmation(bookingPayload)
      .pipe(
        catchError(error => {
          console.error('Booking confirmation failed:', error);
          this.bookingStatusMessage = 'Booking failed. Please try again.';
          this.isBookingSuccess = false;
          this.showConfirmationModal = true;
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Booking successful:', response);
          this.bookingStatusMessage = 'Booking Finalized! Thank you for your purchase. Have a nice Journey sir...';
          this.isBookingSuccess = true;
        }
        this.showConfirmationModal = true;
      }); 
  }

  closeConfirmationModal(): void {
    this.showConfirmationModal = false;
  }
}
