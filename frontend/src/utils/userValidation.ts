import { UserLogin } from "./types";

export const isValidateLogin = ({
  email,
  password,
}: UserLogin): Partial<UserLogin> | null => {
  const loginFormError: Partial<UserLogin> = {};

  const regex = new RegExp(
    /^[a-z0-9]{1,20}\.?[a-z0-9]{1,20}@[a-z0-9]{3,}\.{1}[a-z]{2,7}$/
  );

  if (!email || !regex.test(email)) {
    loginFormError.email = "Please provide a valid email.";
  }

  if (!password || password.length < 8) {
    loginFormError.password = "Password should be atleast 8 characters long.";
  }

  return Object.keys(loginFormError).length !== 0 ? loginFormError : null;
};
