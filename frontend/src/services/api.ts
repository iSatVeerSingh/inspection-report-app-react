import axios, { AxiosError } from "axios";
import { UserLogin } from "../types";

const BASE_URL = "https://dev.inspectionapp.com/api";

export const loginUser = async (userData: UserLogin) => {
  try {
    const response = await axios.post(BASE_URL + "/login", userData, {
      headers: {
        Accept: "application/json",
      },
    });

    return response;
  } catch (err: any) {
    return err.response;
  }
};
