import React from "react";
import Product from "./Product";

export default function Products({ ProductsToDisplay }) {
  return (
    <ul className="products">
      {ProductsToDisplay.map((product, index) => (
        <Product title={product.title} imageURL={product.image} key={index} />
      ))}
    </ul>
  );
}
