import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerAPI = async (registerDetails: any, useMockAPI?: boolean): Promise<any> => {
  if (useMockAPI) {
    return null;
  } else {
    const actualURL: string = `http://localhost:3000/auth/register`;
    const response = await axios.post(actualURL, registerDetails);
    if (response.status !== 201) {
      throw new Error("Something went wrong.");
    } else {
      return response.data;
    }
  }
}