import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private adminService: AdminWorkspaceService) {}
  ngOnInit(): void {
    // console.log(this.table);
  }
  guest: Guest = { phone: '' };
  @Input() isEdit: boolean = false;
  @Input() table: Table = {
    id: '',
    currentGuestCount: 3,
    guestMaxCount: 10,
    tableDescription: 'asd',
    guest: this.guest,
    startTime: '',
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
    let reserveData: ReserveTableInterface = {
      currentGuestCount: this.table.currentGuestCount,
      guestPhone: this.guest.phone,
      id: this.table.id,
      startTime: this.table.startTime,
    };
    this.adminService.reserveTable(reserveData);

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
