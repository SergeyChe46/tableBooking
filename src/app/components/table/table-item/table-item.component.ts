import { DatePipe } from '@angular/common';
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
})
export class TableItemComponent implements OnInit {
  constructor(
    private adminService: AdminWorkspaceService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {
    adminService.TableRefresh$.subscribe({
      next: (table: Table) => {
        if (this.table.id == table.id) {
          this.table = table;
          this.bookedTimes = [...this.bookedTimes, ...table.bookingInfo];
        }
      },
    });
  }

  ngOnInit(): void {
    this.reserveData.id = this.table.id;
  }

  @Input() isEdit: boolean = false;
  @Input() table!: Table;
  @Input() set BookDate(value: Date) {
    this.selectedDate = value.toLocaleDateString();
    this.reserveData.bookDate = this.selectedDate;
  }

  private bookedTimes: BookingInfo[] = [];

  reserveData: ReserveTableInterface = {
    id: '',
    currentGuestCount: 0,
    bookDate: '',
    startTime: '',
    guestPhone: '',
    isBooked: false,
  };
  selectedDate: string = '';
  selectedInfoId: string = '';

  addGuest() {
    this.reserveData.currentGuestCount++;
  }
  removeGuest() {
    this.reserveData.currentGuestCount--;
  }
  reserveTable() {
    this.reserveData.isBooked = true;
    this.adminService.reserveTable(this.reserveData);
  }

  get BookedTimes() {
    return this.bookedTimes;
  }

  selectTime(id: string) {
    this.selectedInfoId = id;
    let bookInfo = this.bookedTimes.find((bt) => {
      return bt.id == id;
    });

    this.dialog.open(BookingInfoDetailComponent, {
      data: { bookInfo },
    });
  }

  extractBookedTime() {
    this.bookedTimes = [];
    this.bookedTimes.push(...this.table.bookingInfo);
  }

  get TooManyGuests() {
    return this.reserveData.currentGuestCount >= this.table.guestMaxCount;
  }
  get TooLowGuest() {
    return this.reserveData.currentGuestCount <= 0;
  }
  get UserHasReservedTable() {
    return localStorage.getItem('alreadyReserve');
  }

  get TableIsBookedToday() {
    return;
  }
}
