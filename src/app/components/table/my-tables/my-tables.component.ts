import { Component } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Table } from '../../../models/table.interface';
import { AdminWorkspaceService } from '../../../services/admin-workspace.service';

@Component({
  selector: 'app-my-tables',
  templateUrl: './my-tables.component.html',
  styleUrl: './my-tables.component.css',
})
export class MyTablesComponent {
  myTables!: Observable<Table[]>;
  parsedDate: Subject<string> = new Subject<string>();

  constructor(private tableService: AdminWorkspaceService) {
    this.tableService.LoadTables$.subscribe({
      next: (tables: Table[]) => {
        this.myTables = of(tables);
        tables.forEach((t) => {
          t.bookingInfo.forEach((bi) => {
            console.log(new Date(Date.parse(bi.bookDate)).toLocaleDateString());
          });
        });
      },
    });
  }

  get DateOnly() {
    return this.parsedDate;
  }
  set DateOnly(date: any) {
    this.parsedDate.next(date.toLocaleDateString());
  }
}
