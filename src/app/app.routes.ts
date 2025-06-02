import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookingBusComponent } from './components/booking-bus/booking-bus.component';
import { TripInfoComponent } from './components/trip-info/trip-info.component';
import { ConfrimTicketComponent } from './components/confrim-ticket/confrim-ticket.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'bus-tickets/booking/bus/search',
        component: BookingBusComponent
    },
    {
            path: 'bus-tickets/booking/bus/trip-info', 
            component: TripInfoComponent
    },
    {
        path:'bus-tickets/booking/bus/confirmTiket',
        component:ConfrimTicketComponent
    },
    {
        path:'**',
        redirectTo:''
    }
];
