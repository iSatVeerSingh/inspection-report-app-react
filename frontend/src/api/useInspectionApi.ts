import { useState, useEffect, useRef } from "react";
import axios, { AxiosProgressEvent, Method } from "axios";

const BASE_URL = "/api";

type UseClientParameters = {
  url: string;
  method?: Method;
  body?: any;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
};

const useClient = ({
  url,
  method,
  body,
  onDownloadProgress,
}: UseClientParameters) => {
  const [data, setData] = useState<any>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<any>(null);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      const userJsonString = localStorage.getItem("user");
      if (!userJsonString) {
        return;
      }
      const user = JSON.parse(userJsonString);

      try {
        const response = await axios.request({
          baseURL: BASE_URL,
          url: url,
          method: method || "GET",
          data: body,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
          onDownloadProgress: onDownloadProgress,
          signal: controllerRef.current.signal,
        });

        if (response.status < 200 || response.status > 299) {
          setError(response.data);
          return;
        }

        setData(response.data);
      } catch (err: any) {
        setError(err.response.data || err.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return {
    data,
    loaded,
    error,
    cancel,
  };
};

export default useClient;
