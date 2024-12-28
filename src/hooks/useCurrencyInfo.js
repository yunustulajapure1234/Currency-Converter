import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        if (result[currency]) {
          setData(result[currency]);
        } else {
          throw new Error(`Invalid response format for currency: ${currency}`);
        }
      } catch (err) {
        console.error("Error fetching currency data:", err);
        setError(err.message);
        setData({}); // Reset data on error
      }
    };

    fetchData();
  }, [currency]);

  return { data, error }; // Return both data and error
}

export default useCurrencyInfo;
