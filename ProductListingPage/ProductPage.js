import React, { useState, useEffect, useRef } from "react";
import Filters from "./Filters";
import Sort from "./Sort";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
const styles = {
  main: { width: 300, margin: "0 auto" },
  item: { padding: 5, cursor: "pointer" },
};

function ProductPage() {
  const [filters, setFilters] = useState({
    category: "",
    price: [0, 1000],
    rating: "",
  });
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const LIMIT = 10;
  useEffect(() => {
    fetchProducts();
  }, [filters, sort, page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const skip = (page - 1) * LIMIT;
      if (filters.category) {
        url = `https://dummyjson.com/products/category/${filters.category}?limit=${LIMIT}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      const result = data.products;
      if (sort === "low") {
        result.sort((a, b) => a.price - b.price);
      } else if (sort === "high") {
        result.sort((a, b) => b.price - a.price);
      }
      setProducts(result);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.main}>
      <Filters filters={filters} setFilters={setFilters} />
      <Sort sort={sort} setSort={setSort} />
      {loading ? <p>Loading...</p> : <ProductList products={products} />}
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default ProductPage;
