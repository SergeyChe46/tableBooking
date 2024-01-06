import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class ToastrBaseService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showWarning(message: string) {
    this.toastr.warning(message);
  }
}
