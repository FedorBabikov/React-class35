import React, { useState } from "react";
import Product from "./Product.js";

export default function Products({ productsToDisplay }) {
  return (
    <ul className="products">
      {productsToDisplay.map((product, index) => (
        <Product
          productID={product.id}
          title={product.title}
          imageURL={product.image}
          key={index}
        />
      ))}
    </ul>
  );
}
