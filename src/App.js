import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();
      if (data.quote) {
        setQuote(data.quote);
        setAuthor(data.author);
      } else {
        setError("No quote found.");
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setError("Failed to fetch quote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.quoteBox}>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <>
            <p className={styles.quote}>"{quote}"</p>
            <p className={styles.author}>- {author}</p>
          </>
        )}
        <button
          className={styles.button}
          onClick={fetchQuote}
          disabled={loading}
        >
          {loading ? "Loading..." : "New Quote"}
        </button>
      </div>
    </div>
  );
}
