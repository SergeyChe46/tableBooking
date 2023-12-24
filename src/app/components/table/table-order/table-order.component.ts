import { Component, Input } from '@angular/core';
import { Order } from '../../../models/order.interface';

@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrl: './table-order.component.css',
})
export class TableOrderComponent {
  @Input() order!: Order | undefined;
  panelOpenState = false;
}
