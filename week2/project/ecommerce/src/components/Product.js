import React from "react";
import { Link } from "react-router-dom";

export default function Product({ productID, title, imageURL }) {
  return (
    <Link style={{ textDecoration: "none" }} to={`/product/${productID}`}>
      {
        <li className="product" data-product={productID}>
          <img className="productImg" src={imageURL} alt={title} />
          <p className="productName">{title}</p>
        </li>
      }
    </Link>
  );
}
