import React from "react";

function Sort({ sort, setSort }) {
  return (
    <div>
      <select onChange={(e)=>setSort(e.target.value )}>
        <option value="Sort">""</option>
        <option value="Low">Price:low-high</option>
        <option value="high">Price:high-low</option>
      </select>
    </div>
  );
}

export default Sort;
