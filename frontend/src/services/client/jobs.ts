export const getAllJobs = async () => {
  try {
    const response = await fetch("/client/jobs");
    if (response.ok) {
      const jobs = response.json();
      return jobs;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
