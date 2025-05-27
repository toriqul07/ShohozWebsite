import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MiddlePartComponent } from '../middle-part/middle-part.component';
import { FooterComponent } from '../footer/footer.component';
import { OrderPartComponent } from '../order-part/order-part.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,MiddlePartComponent,FooterComponent,OrderPartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
