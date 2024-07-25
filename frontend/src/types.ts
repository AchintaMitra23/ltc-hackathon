/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ListItem {
  tokenNo: string;
  employeeId: number;
  orderDate: string;
  counterId: number;
  slotId: number;
  orderDone: any | boolean;
  preference: string;
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
  userId: any;
  username: string;
  email: string;
  approval_status: string;
}

export interface LoginResponseModel {
  email: string;
  mobile: string; 
  password: string;
  preference: string;
  type: string;
  userId: string;
  username: string;
}