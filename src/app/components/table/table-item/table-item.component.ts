import { Component, Input } from '@angular/core';
import { Guest } from '../../../models/guest.interface';
import { ReserveTableInterface } from '../../../models/reserveTable.interface';
import { Table } from '../../../models/table.interface';
import { AdminWorkspaceService } from '../../../services/admin-workspace.service';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css',
})
export class TableItemComponent {
  constructor(private adminService: AdminWorkspaceService) {
    adminService.TableRefresh$.subscribe({
      next: (table: Table) => {
        if (this.table.id === table.id) {
          this.table = table;
        }
      },
    });
  }

  guest: Guest = { phone: '' };
  @Input() isEdit: boolean = false;
  @Input() table!: Table;
  tableIsReserved: boolean = false;

  get Info() {
    return this.table;
  }

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
      guestPhone: this.guest.phone,
      id: this.table.id,
      startTime: this.table.startTime,
      isBooked: true,
    };
    this.adminService.reserveTable(reserveData);

    localStorage.setItem('alreadyReserve', 'true');
  }

  reserveTableCancel() {
    let reserveData: ReserveTableInterface = {
      currentGuestCount: 0,
      guestPhone: '',
      id: this.table.id,
      startTime: '',
      isBooked: false,
    };
    this.adminService.resetTableBooking(reserveData);
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
}
