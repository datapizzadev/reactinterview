import { useState } from "react";

interface UseFetchProps {
  fetchFn(data: unknown): Promise<Response>;
}

const useFetch = <T>({ fetchFn }: UseFetchProps) => {
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const [error, setError] = useState(null);

  const runFetch = async (data: unknown): Promise<T> => {
    setStatus("loading");
    return fetchFn(data)
      .then((res) => {
        setStatus("success");
        return res.json();
      })
      .catch((err) => {
        setStatus("error");
        setError(err);
      });
  };

  return {
    status,
    error,
    runFetch,
  };
};

export default useFetch;
