import { useEffect, useState } from "react";
import { getGenreList } from "../api/tmdb";

let cachedMap = null;

export function useGenreMap() {
  const [map, setMap] = useState(cachedMap);

  useEffect(() => {
    if (cachedMap) return;
    getGenreList()
      .then((data) => {
        const m = {};
        data.genres?.forEach((g) => {
          m[g.id] = g.name;
        });
        cachedMap = m;
        setMap(m);
      })
      .catch(() => setMap({}));
  }, []);

  return map || {};
}
