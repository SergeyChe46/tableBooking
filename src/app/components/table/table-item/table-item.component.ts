import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingInfoResponse } from '../../../models/bookingInfo.interface';
import { Guest } from '../../../models/guest.interface';
import { ReserveTableInterface } from '../../../models/reserveTable.interface';
import { Table } from '../../../models/table.interface';
import { AdminWorkspaceService } from '../../../services/admin-workspace.service';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css',
})
export class TableItemComponent implements OnInit {
  constructor(
    private adminService: AdminWorkspaceService,
    private datePipe: DatePipe
  ) {
    adminService.TableRefresh$.subscribe({
      next: (table: Table) => {
        if (this.table.id === table.id) {
          this.table = table;
        }
      },
    });
  }
  ngOnInit(): void {
    this.bookDate.subscribe({
      next: (value: string) => {
        this.bookingInfo.bookDate = value;
      },
    });
  }

  @Input() isEdit: boolean = false;
  @Input() bookDate!: Observable<string>;
  @Input() table!: Table;

  tableIsReserved: boolean = false;
  guest: Guest = { phone: '' };
  bookingInfo: BookingInfoResponse = { bookDate: '', startTime: '' };

  addGuest() {
    this.table.currentGuestCount++;
  }
  removeGuest() {
    this.table.currentGuestCount--;
  }
  reserveTable() {
    if (this.table.guest?.phone && !this.UserHasReservedTable) {
      this.tableIsReserved = true;
    }
    let reserveData: ReserveTableInterface = {
      currentGuestCount: this.table.currentGuestCount,
      bookDate: this.bookingInfo.bookDate,
      startTime: this.bookingInfo.startTime,
      guestPhone: this.guest.phone,
      id: this.table.id,
      isBooked: true,
    };
    this.adminService.reserveTable(reserveData);
  }

  reserveTableCancel() {
    let reserveData: ReserveTableInterface = {
      currentGuestCount: 0,
      guestPhone: '',
      id: this.table.id,
      bookDate: '',
      startTime: '',
      isBooked: false,
    };

    //this.adminService.resetTableBooking(reserveData);
  }

  get TooManyGuests() {
    return this.table.currentGuestCount >= this.table.guestMaxCount;
  }
  get TooLowGuest() {
    return this.table.currentGuestCount <= 0;
  }
  get UserHasReservedTable() {
    return localStorage.getItem('alreadyReserve');
  }

  get TableIsBookedToday() {
    return;
  }
}
