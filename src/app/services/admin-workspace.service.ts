import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrBaseService
  ) {}

  addTable(newTable: AddTableViewModel) {
    return this.httpClient.post(this.URL + 'AddTable', newTable).subscribe({
      next: (result: any) => {
        this.toastr.showSuccess('Стол успешно добавлен');
      },
      error: (error: any) => {
        this.toastr.showWarning(error.error);
      },
    });
  }

  reserveTable(reservedData: ReserveTableInterface) {
    return this.httpClient
      .patch(this.URL + `Reserve/${reservedData.id}`, reservedData)
      .subscribe({
        next: (res: any) => {
          this.toastr.showSuccess('Стол зарезервирован');
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.showWarning(error.error);
        },
      });
  }

  getTables() {
    return this.httpClient.get<Table[]>(this.URL + 'GetTables');
  }
}
