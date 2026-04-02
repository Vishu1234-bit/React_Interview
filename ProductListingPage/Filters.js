import React from "react";

function Filters({ filters, setFilters }) {
  return (
    <div>
      <select
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            category: e.target.value,
          }))
        }
      >
        <option value="beauty">Beauty</option>
        <option value="groceries">Groceries</option>
      </select>
    </div>
  );
}

export default Filters;
