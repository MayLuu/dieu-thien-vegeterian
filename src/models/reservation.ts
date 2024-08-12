export interface Reservation {
  id: string;
  userName: string;
  phone: string;
  email: string;
  orderDate: string;
  orderTime: string;
  participantNumber: number;
  notes?: string;
}
