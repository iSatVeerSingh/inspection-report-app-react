export const getLoginStatus = () => {
  const isLoggedIn = localStorage.getItem("user");
  console.log(isLoggedIn);
  return isLoggedIn;
};

export const loginUser = (user: any) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
