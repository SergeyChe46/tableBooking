import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingInfo } from '../../../models/bookingInfo.interface';

@Component({
  selector: 'app-booking-info-detail',
  templateUrl: './booking-info-detail.component.html',
  styleUrl: './booking-info-detail.component.css',
})
export class BookingInfoDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public bookingInfo: BookingInfo) {}
}
