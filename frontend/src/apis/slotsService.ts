import axios from 'axios';
import { API_BASE_URL } from "./config";

const API_URL = API_BASE_URL; 

export interface OrderSlot {
  order_count: number;
  slot_name: string;
}

export interface CounterOrders {
  [slotId: number]: OrderSlot;
}

export interface DateOrders {
  [date: string]: {
    [counter: string]: CounterOrders;
  };
}

export const fetchDateOrders = async (company: string, dates: string[]): Promise<DateOrders> => {
  const response = await axios.post(`${API_URL}/user/allDateOrders`, { company, dates });
  return response.data.body;
};
