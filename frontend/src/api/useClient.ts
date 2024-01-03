import { useState, useEffect, useRef } from "react";
import axios, { Method } from "axios";

const BASE_URL = "/client";

const useClient = (url: string, method: Method = "GET", body?: any) => {
  const [data, setData] = useState<any>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<any>(null);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          baseURL: BASE_URL,
          url: url,
          method: method,
          data: body,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
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
