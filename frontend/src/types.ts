/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ListItem {
  tokenNo: string;
  employeeId: number;
  orderDate: string;
  counterId: number;
  slotId: number;
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

export interface LoginResponseModel {
  email: string;
  mobile: string; 
  password: string;
  preference: string;
  type: string;
  userId: string;
  username: string;
}