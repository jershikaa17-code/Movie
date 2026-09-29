import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "velora-my-list";

function readList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useMyList() {
  const [list, setList] = useState(readList);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // storage unavailable — ignore
    }
  }, [list]);

  const isInList = useCallback(
    (id) => list.some((m) => m.id === id),
    [list]
  );

  const toggle = useCallback((movie) => {
    setList((prev) => {
      if (prev.some((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [
        ...prev,
        {
          id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
        },
      ];
    });
  }, []);

  return { list, isInList, toggle };
}
