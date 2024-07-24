export interface ListItem {
  tokenNo: string;
  employeeId: number;
  orderDate: string;
  orderDone: boolean;
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