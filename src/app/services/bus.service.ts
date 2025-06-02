import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface TicketDetails {
  id: number; // This ID is present when received
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
@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://localhost:8080/getParibahon';
  private allBoradingPoint = 'http://localhost:8080/getAllBoardingPoint';
  private createBookingUrl = 'http://localhost:8080/createBookingConfirmation';

  constructor(private http:HttpClient) { }
   getBuses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getAllBoradingPoint(): Observable<any[]> {
    return this.http.get<any[]>(this.allBoradingPoint);
  }
   createBookingConfirmation(bookingData: BookingConfirmationPayload): Observable<any> {
    console.log('Sending booking confirmation payload (ID removed from ticketDetails):', bookingData);
    return this.http.post<any>(this.createBookingUrl, bookingData);
  }
}
