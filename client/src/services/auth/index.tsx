export const getLoginStatus = () => {
  const isLoggedIn = localStorage.getItem("user");
  console.log(isLoggedIn)
  return isLoggedIn
};
