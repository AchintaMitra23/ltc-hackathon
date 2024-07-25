import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrder = async (requestType: any, useMockAPI?: boolean): Promise<any> => {
  if (useMockAPI) {
    return null;
  } else {
    const actualURL: string = `http://localhost:3001/user/createOrder`;
    const response = await axios.post(actualURL, requestType);
    if (response.status !== 201) {
      throw new Error(response.data.body.message);
    } else {
      return response.data;
    }
  }
}