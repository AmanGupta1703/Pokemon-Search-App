import { useState, useEffect } from "react";

type TUseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useFetch = <T = unknown>(url: string): TUseFetchResult<T> => {
  const [data, setData] = useState<T | null>(
    () => (JSON.parse(localStorage.getItem(url) as string) as T) || null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async (): Promise<void> => {
      if (data) return;

      setError(null);
      setLoading(true);

      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as T;
        localStorage.setItem(url, JSON.stringify(data));
        setData(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
};
