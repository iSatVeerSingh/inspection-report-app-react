export const getRequest = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    return await response.json();
  } catch (err) {
    return {
      success: false,
      data: "Request unsuccessful",
    };
  }
};
