import { BookingInfoRequest } from './bookingInfo.interface';
import { Guest } from './guest.interface';
import { Order } from './order.interface';

export interface Table {
  id: string;
  bookingInfo: BookingInfoRequest[];
  name?: string;
  currentGuestCount: number;
  guestMaxCount: number;
  tableDescription: string;
  isBooked: boolean;
  photo?: string;
  order?: Order;
  guest: Guest;
}
