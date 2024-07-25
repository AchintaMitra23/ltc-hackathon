import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOrderHistoryByEmpID = async (employeeID: number | string, useMockAPI?: boolean): Promise<any> => {
  if (useMockAPI) {
    return null;
  } else {
    const actualURL: string = `http://localhost:3000/user/allOrders/${employeeID}`;
    const response = await axios.get(actualURL);
    if (response.status !== 200) {
      throw new Error(response.data.body.message);
    } else {
      return response.data;
    }
  }
}