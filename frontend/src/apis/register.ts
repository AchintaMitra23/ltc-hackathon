/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_BASE_URL } from "./config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerAPI = async (
  registerDetails: any,
  useMockAPI?: boolean
): Promise<any> => {
  if (useMockAPI) {
    return null;
  } else {
    const actualURL: string = `${API_BASE_URL}/auth/register`;
    const response = await axios.post(actualURL, registerDetails);
    if (response.status !== 201) {
      throw new Error(response.data.body.message);
    } else {
      return response.data;
    }
  }
};
