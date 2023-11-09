import { useEffect } from "react";
import handlerElasticSearch from "utils/handlerElasticSearch";

const useElasticSearch = (
  value: string,
  setSearchResults: (results: { path: string; treatmentId: string }[]) => void,
  setSelectIdx: (idx: number) => void
) => {
  useEffect(() => {
    let timeoutId: number | undefined = undefined;

    const search = async () => {
      try {
        const results = await handlerElasticSearch(value);
        setSearchResults(results);
        setSelectIdx(0);
      } catch (error) {
        console.error("검색 중 오류 발생:", error);
      }
    };

    if (value) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(search, 100);
    } else {
      setSearchResults([]);
      setSelectIdx(0);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [value]);
};

export default useElasticSearch;
