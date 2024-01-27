import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingInfo } from '../../../models/bookingInfo.interface';
import { AdminWorkspaceService } from '../../../services/admin-workspace.service';

@Component({
  selector: 'app-booking-info-detail',
  templateUrl: './booking-info-detail.component.html',
  styleUrl: './booking-info-detail.component.css',
})
export class BookingInfoDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public bookingInfo: BookingInfo,
    private tableService: AdminWorkspaceService
  ) {}

  cancelReserve(bookingInfoId: string) {
    console.log(this.bookingInfo);

    this.tableService.cancelTableBooking(bookingInfoId);
  }
}
