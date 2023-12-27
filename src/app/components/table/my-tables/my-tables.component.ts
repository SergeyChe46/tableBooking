import { Component } from '@angular/core';
import { Table } from '../../../models/table.interface';
import { AdminWorkspaceService } from '../../../services/admin-workspace.service';

@Component({
  selector: 'app-my-tables',
  templateUrl: './my-tables.component.html',
  styleUrl: './my-tables.component.css',
})
export class MyTablesComponent {
  myTables: Table[] = [];

  constructor(private tableService: AdminWorkspaceService) {
    this.myTables = this.tableService.myTables;
  }
}
