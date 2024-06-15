import { useEffect, useState } from "react";
import apiClientPythonBE from "../services/api-client-pythonBE";

const usePSO = (
  endpoint: string,
  valid: boolean,
  iters: number,
  c1: number,
  c2: number,
  w: number,
  min_parts: number,
  max_parts: number,
  dims: number,
  weights: number[],
  max_layers: number,
  min_layers: number,
  max_units: number,
  min_units: number
) => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (valid) {
      const payload = {
        iterations: iters,
        c1: c1,
        c2: c2,
        w: w,
        min_particles: min_parts,
        max_particles: max_parts,
        dimensions: dims,
        weights: weights,
        max_layers: max_layers,
        min_layers: min_layers,
        max_units: max_units,
        min_units: min_units,
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

export default usePSO;
