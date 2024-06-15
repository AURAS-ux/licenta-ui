import { useEffect, useState } from "react";
import apiClient from "../services/api-client-elasticDb";
import { CanceledError } from "axios";

const useStats = (endpoint: string, valid: boolean) => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (valid) {
      const controller = new AbortController();
      setLoading(true);
      apiClient
        .get(endpoint, { signal: controller.signal })
        .then((res) => {
          setResponse(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    }
  }, [valid]);

  return { response, error, isLoading };
};

export default useStats;
