export const getLoginStatus = () => {
  const isLoggedIn = localStorage.getItem("user");
  console.log(isLoggedIn);
  return isLoggedIn;
};

export const loginUser = (user: any) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker.register(
    //     import.meta.env.MODE === "production" ? "/sw.js" : "/dev-sw.js?dev-sw",
    //     { type: import.meta.env.MODE === "production" ? "classic" : "module" }
    //   );
    // }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
