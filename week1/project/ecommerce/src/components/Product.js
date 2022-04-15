import React from "react";

export default function Product({
  productID,
  title,
  imageURL,
  onClickHandler,
}) {
  return (
    <li className="product" data-product={productID} onClick={onClickHandler}>
      <img className="productImg" src={imageURL} alt={title} />
      <p className="productName">{title}</p>
    </li>
  );
}
