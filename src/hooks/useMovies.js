import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Runs an async fetcher and tracks loading/error/data state.
 * `deps` controls when the fetcher re-runs, mirroring useEffect deps.
 */
export function useMovies(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const load = useCallback(() => {
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    fetcher()
      .then((res) => {
        if (id !== requestId.current) return;
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (id !== requestId.current) return;
        setError(err.message || "Something went wrong.");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, retry: load };
}
