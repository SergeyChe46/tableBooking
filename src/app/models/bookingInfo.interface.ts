export interface BookingInfo {
  id: string;
  bookDate?: string;
  startTime?: string;
  currentGuestCount: number;
  isBooked?: boolean;
  guestPhone?: string;
}
