import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveAllAdmins = async (requestBody: any, useMockAPI?: boolean): Promise<any> => {
  if (useMockAPI) {
    return null;
  } else {
    const actualURL: string = `http://localhost:3001/hr/approveUser`;
    const response = await axios.post(actualURL, requestBody);
    if (response.status !== 200) {
      throw new Error(response.data.body.message);
    } else {
      return response.data;
    }
  }
}