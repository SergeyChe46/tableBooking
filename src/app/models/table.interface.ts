import { BookingInfo } from './bookingInfo.interface';

export interface Table {
  id: string;
  bookingInfo: BookingInfo[];
  name?: string;
  guestMaxCount: number;
  tableDescription: string;
  photo?: string;
}
