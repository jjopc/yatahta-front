import axios from "axios";

import { getAccessToken } from "./AuthService";

export const getGeneralStatistics = async () => {
  const url = `${import.meta.env.VITE_API_URL}/statistics/`;
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(url, { headers });
    return { response, isError: false };
  } catch (error) {
    return { error, isError: true };
  }
};

export const getUsersClassification = async () => {
  const url = `${import.meta.env.VITE_API_URL}/users/classification/`;
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(url, { headers });
    return { response, isError: false };
  } catch (error) {
    return { error, isError: true };
  }
};