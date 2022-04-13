import React from "react";

export default function Product({ title, imageURL }) {
  return (
    <li className="product">
      <img className="productImg" src={imageURL} alt={title} />
      <p className="productName">{title}</p>
    </li>
  );
}
