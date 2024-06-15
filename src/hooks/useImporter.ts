import { useEffect, useState } from "react";
import apiClientPythonBE from "../services/api-client-pythonBE";

const useImporter = (endpoint: string, index: string, content: string) => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const payload = {
      index_name: index,
      content: content,
    };
    if (content != "" && index != "") {
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
  }, [index, content]);

  return [isLoading, response, error];
};

export default useImporter;
