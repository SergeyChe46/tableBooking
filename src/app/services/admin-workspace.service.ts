import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BASE_TABLE_API } from '../consts';
import { AddTableViewModel } from '../models/addTableViewModel.interface';
import { ReserveTableInterface } from '../models/reserveTable.interface';
import { Table } from '../models/table.interface';
import { ToastrBaseService } from './toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AdminWorkspaceService {
  private URL: string = BASE_TABLE_API;
  private tables: Table[] = [];
  private loadTables$ = new Subject<Table[]>();
  private tableReserve$ = new Subject<Table>();

  public get LoadTables$() {
    return this.loadTables$;
  }

  public get TableRefresh$() {
    return this.tableReserve$;
  }

  public get Tables() {
    return this.tables;
  }

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrBaseService
  ) {
    this.getTables();
  }

  addTable(newTable: AddTableViewModel) {
    this.httpClient.post(this.URL + 'AddTable', newTable).subscribe({
      next: (result: any) => {
        this.toastr.showSuccess('Стол успешно добавлен');
        this.getTables();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.showWarning(error.error);
      },
    });
  }

  reserveTable(reservedData: ReserveTableInterface) {
    this.httpClient
      .patch<Table>(this.URL + `Reserve/${reservedData.id}`, reservedData)
      .subscribe({
        next: (res: Table) => {
          this.toastr.showSuccess('Стол зарезервирован');
          this.TableRefresh$.next(res);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.showWarning(error.error);
        },
      });
  }
  //TO DO
  resetTableBooking(reservedData: ReserveTableInterface) {
    this.httpClient
      .patch(this.URL + `Reserve/${reservedData.id}`, reservedData)
      .subscribe({
        next: (res: any) => {
          this.toastr.showSuccess('Отменено');
          this.TableRefresh$.next(res);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.showWarning(error.error);
        },
      });
  }

  getTables() {
    this.httpClient.get<Table[]>(this.URL + 'GetTables').subscribe({
      next: (tables: Table[]) => {
        this.tables = tables;
        this.toastr.showSuccess('OK');
        this.LoadTables$.next(this.tables);
      },
    });
  }
}
