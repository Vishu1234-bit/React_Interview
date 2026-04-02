import React from "react";

function Pagination({ page, setPage }) {
  return (
    <div>
      <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>prev</button>
      <span>Page {page}</span>
      <button onClick={() => setPage((p) => p + 1)}>next</button>
    </div>
  );
}

export default Pagination;
