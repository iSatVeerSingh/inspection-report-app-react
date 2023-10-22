import Dexie from "dexie";
import { UserDB } from "../clientdb";

export const getLoginStatus = () => {
  const isLoggedIn = localStorage.getItem("user");
  console.log(isLoggedIn);
  return isLoggedIn;
};

export const loginUser = async (user: any) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(
        import.meta.env.MODE === "production" ? "/sw.js" : "/dev-sw.js?dev-sw",
        { type: import.meta.env.MODE === "production" ? "classic" : "module" }
      );
    }

    const savedUser = await UserDB.user.add({
      email: user.email,
    });

    return savedUser;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const isInitDone = async () => {
  try {
    const isExists = await Dexie.exists("inspection-db");
    return isExists;
  } catch (err) {
    console.log(err);
    return null;
  }
};
