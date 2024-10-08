import { useEffect, useState } from "react";
import apiClientPythonBE from "../services/api-client-pythonBE";

const useClassifier = (
  endpoint: string,
  valid: boolean,
  layers: number,
  units: number,
  activation: string,
  input: [],
  target: number
) => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (valid) {
      const payload = {
        layers: layers,
        unitsPerLayer: units,
        activation: activation,
        input: input,
        target_column: target,
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

export default useClassifier;
