import { UserLogin } from "../types";

export const validateLogin = ({
  email,
  password,
}: UserLogin): Partial<UserLogin> | null => {
  const formErrors: Partial<UserLogin> = {};

  const regex = new RegExp(
    /^[a-z0-9]{1,20}\.?[a-z0-9]{1,20}@[a-z0-9]{3,}\.{1}[a-z]{2,7}$/
  );

  if (!email || !regex.test(email)) {
    formErrors.email = "Please provide a valid email.";
  }

  if (!password || password === "") {
    formErrors.password = "Password is required.";
  }

  if (Object.keys(formErrors).length !== 0) {
    return formErrors;
  }

  return null;
};
