import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (loginDetails: any, useMockAPI?: boolean): Promise<any> => {
  if (useMockAPI) {
    return null;
  } else {
    const actualURL: string = `http://localhost:3000/api/login/${loginDetails.empId}/${loginDetails.password}`;
    const response = await axios.get(actualURL);
    if (response.status !== 200) {
      throw new Error(response.data);
    } else {
      return response.data;
    }
  }
}