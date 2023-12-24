import { Component } from '@angular/core';
import { Table } from '../../../models/table.interface';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css',
})
export class TableItemComponent {
  tableIsReserved: boolean = false;

  table: Table = {
    currentGuestCount: 0,
    guestMaxCount: 10,
    tableDescription: 'First table',
    order: { dish: 'First dish', count: 1 },
    guest: { phone: '' },
  };

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
    localStorage.setItem('alreadyReserve', 'true');
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
