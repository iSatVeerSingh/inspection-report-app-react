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
      ...init,
      method: "POST",
    });

    return await response.json();
  } catch (err) {
    return {
      success: false,
      data: "Request unsuccessful",
    };
  }
};

export const putRequest = async (url: string, init: RequestInit) => {
  try {
    const response = await fetch(url, {
      ...init,
      method: "PUT",
    });

    return await response.json();
  } catch (err) {
    return {
      success: false,
      data: "Request unsuccessful",
    };
  }
};
