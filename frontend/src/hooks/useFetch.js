import { useState, useEffect } from "react";

function useFetch(fetchFn, initalValue) {
  const [fetchedData, setFetchedData] = useState(initalValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsFetching(true);
        const fetchedData = await fetchFn();
        setFetchedData(fetchedData);
        setIsFetching(false);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch please try again.",
        });
        setIsFetching(false);
      }
    }
    fetchData();
  }, [fetchFn]);
  return { fetchedData, isFetching, error, setFetchedData, setError };
}

export default useFetch;
