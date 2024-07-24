import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllOrders = async (requestType: any, useMockAPI?: boolean): Promise<any> => {
  if (useMockAPI) {
    return null;
  } else {
    const actualURL: string = `http://localhost:3000/admin/getAllOrders`;
    const response = await axios.post(actualURL, requestType);
    if (response.status !== 200) {
      throw new Error("Something went wrong.");
    } else {
      return response.data;
    }
  }
}