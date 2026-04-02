import React from "react";

function ProductList({ products }) {
  return (
    <div>
      {products?.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>{item.category}</p>
          <p>rs.{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
