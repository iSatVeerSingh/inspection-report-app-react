import { JobDetails, UserLogin } from "../types";

export const validateLogin = ({
  email,
  password,
}: UserLogin): Partial<UserLogin> | null => {
  const formErrors: Partial<UserLogin> = {};

  const regex = new RegExp(
    /^[a-z0-9]{1,20}\.?[a-z0-9]{1,20}@[a-z0-9]{3,}\.{1}[a-z]{2,7}\.?[a-z]{0,7}$/
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

export const validateJobForm = ({
  jobNumber,
  jobType,
  customer,
  date,
  siteAddress,
  time,
}: JobDetails): Partial<JobDetails> | null => {
  const formErrors: Partial<JobDetails> = {};

  if (jobNumber === "" || Number.isNaN(parseInt(jobNumber as string))) {
    formErrors.jobNumber = "Please provide a valid job number";
  }

  if (jobType === "") {
    formErrors.jobType = "Please select a job type";
  }

  if (customer === "") {
    formErrors.customer = "Please provide customer's name";
  }

  if (date === "") {
    formErrors.date = "Please select a date";
  }

  if (time === "") {
    formErrors.time = "Please select time";
  }

  if (siteAddress === "") {
    formErrors.siteAddress = "Please provide site address";
  }

  if (Object.entries(formErrors).length !== 0) {
    return formErrors;
  }

  return null;
};
