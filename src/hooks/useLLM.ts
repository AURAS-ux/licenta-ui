import { useEffect, useState } from "react";
import apiClientPythonBE from "../services/api-client-pythonBE";

const useLLM = (endpoint: string, valid: boolean, iters: number) => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (valid) {
      const payload = {
        iterations: iters,
      };
      setLoading(true);
      apiClientPythonBE
        .post(endpoint, payload)
        .then((res) => {
          setResponse(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [valid]);

  return [isLoading, response, error];
};

export default useLLM;
