import { useState } from "react";

interface UseFetchProps {
  fetchFn(data: unknown): Promise<Response>;
}

type ResponseType<T> = {
  data: T | null;
  error: unknown;
};

const useFetch = <T>({ fetchFn }: UseFetchProps) => {
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const runFetch = async (data: unknown): Promise<ResponseType<T>> => {
    setStatus("loading");
    return fetchFn(data)
      .then(async (res) => {
        setStatus("success");
        return {
          data: await res.json(),
          error: null,
        };
      })
      .catch((err) => {
        setStatus("error");
        return {
          data: null,
          error: err,
        };
      });
  };

  return {
    status,
    runFetch,
  };
};

export default useFetch;
