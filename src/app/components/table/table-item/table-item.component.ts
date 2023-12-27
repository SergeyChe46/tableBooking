import { Component, Input } from '@angular/core';
import { Table } from '../../../models/table.interface';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css',
})
export class TableItemComponent {
  @Input() isEdit: boolean = false;
  @Input() table: Table = {
    currentGuestCount: 3,
    guestMaxCount: 10,
    tableDescription: 'asd',
    guest: { phone: '' },
  };
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
