import axios from "axios";

import { getAccessToken, getUser } from "./AuthService";

export const getDoctorPatients = async () => {
  const url = `${import.meta.env.VITE_API_URL}/users/${getUser().user_id}/patients_list/`;
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(url, { headers });
    return { response, isError: false };
  } catch (error) {
    return { error, isError: true };
  }
};
