/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ListItem {
  tokenNo: string;
  employeeId: number;
  orderDate: string;
  orderDone: any | boolean;
}

export interface OrderHistory {
  empId: number;
  counter: string;
  slot: string;
  orderDate: string;
  tokenNo: string;
  orderStatus: string;
  preference: string;
}

export interface Admins {
  id: number;
  name: string;
  email: string;
  approval_status: boolean;
}