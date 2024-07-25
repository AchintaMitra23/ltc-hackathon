import axios from "axios";
import { API_BASE_URL } from "./config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllUnapprovedAdmins = async (useMockAPI?: boolean): Promise<any> => {
  if (useMockAPI) {
    return null;
  } else {
    const actualURL: string = `${API_BASE_URL}/hr/getAdminToApprove`;
    const response = await axios.get(actualURL);
    if (response.status !== 200) {
      throw new Error(response.data.body.message);
    } else {
      return response.data;
    }
  }
}