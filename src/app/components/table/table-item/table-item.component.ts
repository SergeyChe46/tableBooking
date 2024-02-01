import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingInfo } from '../../../models/bookingInfo.interface';
import { ReserveTableInterface } from '../../../models/reserveTable.interface';
import { Table } from '../../../models/table.interface';
import { AdminWorkspaceService } from '../../../services/admin-workspace.service';
import { BookingInfoDetailComponent } from '../booking-info-detail/booking-info-detail.component';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableItemComponent implements OnInit {
  @Input() table!: Table;
  @Input() set BookDate(value: Date) {
    this.selectedDate = value.toLocaleDateString();
    this.reserveData.bookDate = this.selectedDate;
  }

  constructor(
    private adminService: AdminWorkspaceService,
    private dialog: MatDialog
  ) {
    adminService.TableRefresh$.subscribe({
      next: (table: Table) => {
        if (this.table.id == table.id) {
          this.table = table;
          this.#bookedTimes = [...this.#bookedTimes, ...table.bookingInfo];
        }
      },
    });
    adminService.CanceledBooking$.subscribe({
      next: (bookingInfo: BookingInfo) => {
        this.#bookedTimes = this.BookedTimes.filter((bi) => {
          return bi.id != bookingInfo.id;
        });
      },
    });
  }

  ngOnInit(): void {
    this.reserveData.id = this.table.id;
    this.#extractBookedTime();
  }

  reserveData: ReserveTableInterface = {
    currentGuestCount: 0,
    bookDate: '',
    startTime: '',
    guestPhone: '',
  };
  selectedDate: string = '';
  selectedInfoId: string = '';

  get TooManyGuests() {
    return this.reserveData.currentGuestCount >= this.table.guestMaxCount;
  }
  get TooLowGuest() {
    return this.reserveData.currentGuestCount <= 0;
  }

  get BookedTimes() {
    return this.#bookedTimes;
  }

  get CanReserve() {
    return (
      this.reserveData.startTime == '' || this.reserveData.guestPhone == ''
    );
  }
  addGuest() {
    this.reserveData.currentGuestCount++;
  }
  removeGuest() {
    this.reserveData.currentGuestCount--;
  }
  reserveTable() {
    this.adminService.reserveTable(this.reserveData);
    this.#clearForm();
  }

  selectTime(id: string) {
    this.selectedInfoId = id;
    let bookInfo = this.#bookedTimes.find((bt) => {
      return bt.id == id;
    });

    this.dialog.open(BookingInfoDetailComponent, {
      data: bookInfo,
    });
  }

  todayBookings(): BookingInfo[] {
    return this.BookedTimes.filter((bt) => {
      return new Date(bt.bookDate!).toLocaleDateString() == this.selectedDate;
    });
  }

  #extractBookedTime() {
    this.#bookedTimes = [];
    this.#bookedTimes = [...this.BookedTimes, ...this.table.bookingInfo];
  }

  #clearForm() {
    this.reserveData.currentGuestCount = 0;
    this.reserveData.startTime = '';
    this.reserveData.guestPhone = '';
  }

  #bookedTimes: BookingInfo[] = [];
}
