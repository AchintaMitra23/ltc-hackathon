import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginAPI = async (loginDetails: any, useMockAPI?: boolean): Promise<any> => {
  if (useMockAPI) {
    return null;
  } else {
    const actualURL: string = `http://localhost:3000/auth/login`;
    const response = await axios.post(actualURL, loginDetails);
    if (response.status !== 200) {
      throw new Error(response.data.body.message);
    } else {
      return response.data;
    }
  }
}