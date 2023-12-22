import { Method } from "axios";
import { UserDB } from "../services/clientdb";

export const inspectionApi = async (
  input: RequestInfo,
  method: Method = "GET",
  body?: any
): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    const user = await UserDB.user.get("user");
    const response = await fetch(input, {
      method: method,
      body: body,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Invalid request",
      };
    }
    return {
      success: true,
      data: data,
    };
  } catch (err: any) {
    if (err.message === "Failed to fetch") {
      return {
        success: false,
        message: "No internet connection. You are offline.",
      };
    }
    return {
      success: false,
      message: err.message || "Something went wrong",
    };
  }
};
