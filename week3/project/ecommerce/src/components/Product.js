import React from "react";
import { Link } from "react-router-dom";

export default function Product({ productID, title, imageURL }) {
  return (
    <Link to={`/product/${productID}`}>
      {
        <li className="card" data-product={productID}>
          <img className="cardImg" src={imageURL} alt={title} />
          <p className="cardName">{title}</p>
        </li>
      }
    </Link>
  );
}
