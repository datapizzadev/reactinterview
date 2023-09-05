const fetchProxy = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response> => {
  return fetch("http://0.0.0.0:8080/" + input.toString(), init);
};

export default fetchProxy;
