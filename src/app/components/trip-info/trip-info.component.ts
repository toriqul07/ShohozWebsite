import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
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
@Component({
  selector: 'app-trip-info',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FooterComponent,FormsModule],
  templateUrl: './trip-info.component.html',
  styleUrl: './trip-info.component.css'
})
export class TripInfoComponent implements OnInit{
  ticketDetails: TicketDetails | undefined;
  selectedSeats: string[] = [];
  boardingPoint: BoardingPointDetails | undefined;

  // Form fields for Contact Details
  mobileNumber: string = '';
  email: string = '';
   // Use an array for passenger details, even if only one for now
  passengerDetails: PassengerDetails[] = [{
    firstName: '',
    lastName: '',
    gender: ''
  }];


  passengerFirstName: string = '';
  passengerLastName: string = '';
  passengerGender: 'Male' | 'Female' | '' = ''; 

   constructor(private route: ActivatedRoute,private router: Router) { }
   ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Parse the JSON strings back into objects
      if (params['ticketDetails']) {
        this.ticketDetails = JSON.parse(params['ticketDetails']);
      }
      if (params['selectedSeats']) {
        this.selectedSeats = JSON.parse(params['selectedSeats']);
      }
      if (params['boardingPoint']) {
        this.boardingPoint = JSON.parse(params['boardingPoint']);
      }
      // console.log('Trip Info:', this.ticketDetails, this.selectedSeats, this.boardingPoint);
    });
  }
  onProceedToSubmit(): void {
    // if (!this.mobileNumber || !this.email || !this.passengerFirstName || !this.passengerLastName || !this.passengerGender) {
    //   alert('Please fill in all required contact and passenger details.');
    //   return;
    // }
    // Basic validation
    
    if (!this.mobileNumber || !this.email || !this.passengerFirstName || !this.passengerLastName || !this.passengerGender) {
      alert('Please fill in all required contact and passenger details.');
      return;
    }


    // console.log('--- Booking Summary ---');
    // console.log('Ticket:', this.ticketDetails);
    // console.log('Selected Seats:', this.selectedSeats);
    // console.log('Boarding Point:', this.boardingPoint);
    // console.log('Contact Mobile:', this.mobileNumber);
    // console.log('Contact Email:', this.email);
    // // UPDATE THESE CONSOLE.LOGS TO USE passengerDetails[0]
    // console.log('Passenger Name:', this.passengerFirstName, this.passengerLastName);
    // console.log('Passenger Gender:', this.passengerGender);
    
    // Package all necessary data to pass to the confirmation route
   // Package all necessary data to pass to the confirmation route
    const bookingConfirmationData = {
      ticketDetails: this.ticketDetails,
      selectedSeats: this.selectedSeats,
      boardingPoint: this.boardingPoint,
      mobileNumber: this.mobileNumber,
      email: this.email,
      // Pass individual passenger details directly
      passengerDetails: { // Create an object for the single passenger
        firstName: this.passengerFirstName,
        lastName: this.passengerLastName,
        gender: this.passengerGender
      }
    };

    // Navigate to the confirmation route
    this.router.navigate(['bus-tickets/booking/bus/confirmTiket'], {
      queryParams: {
        ticketDetails: JSON.stringify(bookingConfirmationData.ticketDetails),
        selectedSeats: JSON.stringify(bookingConfirmationData.selectedSeats),
        boardingPoint: JSON.stringify(bookingConfirmationData.boardingPoint),
        mobileNumber: bookingConfirmationData.mobileNumber,
        email: bookingConfirmationData.email,
        passengerDetails: JSON.stringify(bookingConfirmationData.passengerDetails) // Stringify the single passenger object
      }
    });
  }

}
