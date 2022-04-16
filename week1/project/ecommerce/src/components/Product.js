import React from "react";

export default function Product({ productID, title, imageURL, clickHandler }) {
  return (
    <li className="product" data-product={productID} onClick={clickHandler}>
      <img className="productImg" src={imageURL} alt={title} />
      <p className="productName">{title}</p>
    </li>
  );
}
