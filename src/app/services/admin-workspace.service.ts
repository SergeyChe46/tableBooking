import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BASE_TABLE_API } from '../consts';
import { AddTableViewModel } from '../models/addTableViewModel.interface';
import { BookingInfo } from '../models/bookingInfo.interface';
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
  private canceledBooking$ = new Subject<BookingInfo>();

  public get CanceledBooking$() {
    return this.canceledBooking$;
  }

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
    this.httpClient.patch<Table>(this.URL + 'Reserve', reservedData).subscribe({
      next: (res: Table) => {
        this.toastr.showSuccess('Стол зарезервирован');
        this.tableReserve$.next(res);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
        this.toastr.showWarning(error.error);
      },
    });
  }

  cancelTableBooking(bookingInfoId: string) {
    this.httpClient
      .delete(this.URL + `CancelReserve/${bookingInfoId}`)
      .subscribe({
        next: (res: any) => {
          this.toastr.showSuccess('Отменено');
          this.TableRefresh$.next(res);
          this.CanceledBooking$.next(res);
          console.log('ok');
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.showWarning(error.error);
          console.log('not ok');
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
