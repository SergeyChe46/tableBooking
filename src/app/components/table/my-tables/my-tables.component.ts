import { Component } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Table } from '../../../models/table.interface';
import { AdminWorkspaceService } from '../../../services/admin-workspace.service';

@Component({
  selector: 'app-my-tables',
  templateUrl: './my-tables.component.html',
  styleUrl: './my-tables.component.css',
})
export class MyTablesComponent {
  myTables!: Observable<Table[]>;

  selected: Date = new Date();

  constructor(private tableService: AdminWorkspaceService) {
    this.tableService.LoadTables$.subscribe({
      next: (tables: Table[]) => {
        this.myTables = of(tables);
      },
    });
  }
}
