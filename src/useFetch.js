import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();

    setTimeout(
      () =>
        fetch(url, { signal: abortControl.signal })
          .then((resObject) => {
            if (!resObject.ok) {
              throw Error("Error: could not receive info from server");
            }
            return resObject.json();
          })
          .then((data) => {
            setData(data);
            setIsPending(false);
            setError(null);
          })
          .catch((err) => {
            if (err.name === "AbortError") {
              console.log("fetch aborted");
            } else {
              setError(err.message);
              setIsPending(false);
            }
          }),
      1000
    );

    return () => {
      abortControl.abort();
    };
  }, []);

  return { data, isPending, error };
}
