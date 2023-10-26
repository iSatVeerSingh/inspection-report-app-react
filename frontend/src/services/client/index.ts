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

export const postRequest = async (url: string, init: RequestInit) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      ...init,
    });

    return await response.json();
  } catch (err) {
    return {
      success: false,
      data: "Request unsuccessful",
    };
  }
};
