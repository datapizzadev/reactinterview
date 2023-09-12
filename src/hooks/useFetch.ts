import { useState } from "react";

interface UseFetchProps {
  fetchFn(data: unknown): Promise<Response>;
}

type ResponseType<T> = {
  resData: T | null;
  error: Error | null;
};

const useFetch = <T>({ fetchFn }: UseFetchProps) => {
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const [resData, setResData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const runFetch = async (data: unknown): Promise<ResponseType<T>> => {
    setStatus("loading");
    return fetchFn(data)
      .then(async (res) => {
        setStatus("success");
        console.log(res);
        if (!res.ok) throw new Error("Error while finding solution");

        const resJson = await res.json();
        setResData(resJson);
        setError(null);
        return {
          resData: resJson,
          error: null,
        };
      })
      .catch((err) => {
        setStatus("error");
        setResData(null);
        setError(err);
        return {
          resData: null,
          error: err,
        };
      });
  };

  return {
    status,
    runFetch,
    resData,
    error,
  };
};

export default useFetch;
