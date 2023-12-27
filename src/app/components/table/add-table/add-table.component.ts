import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddTableViewModel } from '../../../models/addTableViewModel.interface';
import { AdminWorkspaceService } from '../../../services/admin-workspace.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.css',
})
export class AddTableComponent {
  tableForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private tableService: AdminWorkspaceService
  ) {
    this.tableForm = this.formBuilder.group({
      name: [''],
      guestMaxCount: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      tableDescription: [''],
    });
  }

  get tableName() {
    return this.tableForm.get('name') as FormControl;
  }
  get guestMaxCount() {
    return this.tableForm.get('guestMaxCount') as FormControl;
  }
  get tableDescription() {
    return this.tableForm.get('tableDescription') as FormControl;
  }

  onSubmit() {
    const tableModel: AddTableViewModel = {
      name: this.tableName.value,
      guestMaxCount: this.guestMaxCount.value,
      tableDescription: this.tableDescription.value,
    };
    this.tableService.addTable(tableModel);
    console.log(this.tableService.myTables);
  }
}
