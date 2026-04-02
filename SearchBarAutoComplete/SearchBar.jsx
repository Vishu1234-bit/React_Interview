import React, { useState, useEffect, useRef } from 'react';
import Suggestions from './Suggestions';

const styles = {
  main: { width: 300, margin: '0 auto' },
  item: { padding: 5, cursor: 'pointer' },
};

function SearchBar() {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef({});

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchSuggestions = async (query) => {
    if (cache.current[query]) {
      setSuggestions(cache.current[query]);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await res.json();
      const results = data.products.map((p) => p.title);
      cache.current[query] = results;
      setSuggestions(results);
    } catch (error) {
      setError('Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'ArrowDown') {
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        setQuery(suggestions[activeIndex]);
      }
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  const handleSelect = (item) => {
    setQuery(item);
    setSuggestions([]);
  };

  return (
    <div style={styles.main}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        placeholder="Search..."
        onKeyDown={handleKeyDown}
      />
      <Suggestions suggestions={suggestions} activeIndex={activeIndex} handleSelect={handleSelect} />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
}

export default SearchBar;
