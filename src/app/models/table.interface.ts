import { Guest } from './guest.interface';
import { Order } from './order.interface';

export interface Table {
  startTime?: Date;
  name?: string;
  currentGuestCount: number;
  guestMaxCount: number;
  tableDescription: string;
  photo?: string;
  order?: Order;
  guest?: Guest;
}
