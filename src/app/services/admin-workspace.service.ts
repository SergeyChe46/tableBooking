import { Injectable } from '@angular/core';
import { AddTableViewModel } from '../models/addTableViewModel.interface';
import { Table } from '../models/table.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminWorkspaceService {
  myTables: Table[] = [];

  constructor() {}

  addTable(newTable: AddTableViewModel) {
    const table: Table = {
      name: newTable.name,
      guestMaxCount: newTable.guestMaxCount,
      tableDescription: newTable.tableDescription,
      currentGuestCount: 0,
      guest: { phone: '' },
    };
    this.myTables.push(table);
  }

  // editTable(name: string) {
  //   this.myTables.find((table) => {
  //     return table.name == name;
  //   });
  // }
}
