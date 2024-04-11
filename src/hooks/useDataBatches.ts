import { useEffect, useState } from "react";
import apiClient from "../services/api-client-elasticDb";
import { CanceledError } from "axios";
import { Patient } from "./usePatients";

const useDataBatches = (endpoint: string, batchValue: string) => {
  const [batches, setCount] = useState<Patient[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (batchValue != "") {
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
    }
  }, [batchValue]);

  return { batches, error, isLoading };
};

export default useDataBatches;
