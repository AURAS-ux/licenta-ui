import { useEffect, useState } from "react";
import apiClient from "../services/api-client-elasticDb";
import { CanceledError } from "axios";

interface Count {
  count: number;
}

const useDataCount = (endpoint: string) => {
  const [count, setCount] = useState<Count>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get(endpoint, { signal: controller.signal })
      .then((res) => {
        setCount(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { count, error, isLoading };
};

export default useDataCount;
