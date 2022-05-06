import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FavContext from "../FavContext.js";

import HeartRegular from "../assets/heart-regular.svg";
import HeartSolid from "../assets/heart-solid.svg";

export default function Product({ productID, title, imageURL }) {
  const { items, toggleItem } = useContext(FavContext);

  return (
    <Link to={`/product/${productID}`}>
      {
        <li className="card" data-product={productID}>
          <img
            className="heart"
            src={items.includes(productID) ? HeartSolid : HeartRegular}
            alt="heart"
            onClick={(e) => toggleItem(e, productID)}
          />
          <img className="cardImg" src={imageURL} alt={title} />
          <p className="cardName">{title}</p>
        </li>
      }
    </Link>
  );
}
