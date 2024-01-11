import { Guest } from './guest.interface';
import { Order } from './order.interface';

export interface Table {
  id: string;
  startTime: string;
  name?: string;
  currentGuestCount: number;
  guestMaxCount: number;
  tableDescription: string;
  isBooked: boolean;
  photo?: string;
  order?: Order;
  guest: Guest;
}
