import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Table } from '../../../models/table.interface';
import { AdminWorkspaceService } from '../../../services/admin-workspace.service';
import { ToastrBaseService } from '../../../services/toastr.service';

@Component({
  selector: 'app-my-tables',
  templateUrl: './my-tables.component.html',
  styleUrl: './my-tables.component.css',
})
export class MyTablesComponent implements OnInit {
  myTables$!: Observable<Table[]>;

  constructor(
    private tableService: AdminWorkspaceService,
    private toastr: ToastrBaseService
  ) {}
  ngOnInit(): void {
    this.getTables();
  }

  getTables() {
    this.tableService.getTables().subscribe({
      next: (result: Table[]) => {
        this.myTables$ = of(result);
        this.toastr.showSuccess('Загружено');
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.showWarning(error.error);
      },
    });
  }
}
