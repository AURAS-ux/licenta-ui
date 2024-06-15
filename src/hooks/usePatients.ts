import { useEffect, useState } from "react";
import apiClient from "../services/api-client-elasticDb";
import { CanceledError } from "axios";

export interface Patient {
  exang: number;
  "Patient ID": string;
  sex: number;
  num: number;
  thal: string;
  chol: number;
  slope: number;
  cp: number;
  trestbps: number;
  oldpeak: number;
  thalach: number;
  fbs: number;
  age: number;
  ca: string;
  restecg: number;
}

const usePatients = (endpoint: string) => {
  const [data, setData] = useState<Patient[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get(endpoint, { signal: controller.signal })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [endpoint]);

  return { data, error, isLoading };
};

export default usePatients;
