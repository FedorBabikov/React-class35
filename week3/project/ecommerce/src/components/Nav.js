import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FavContext from "../FavContext.js";

import HeartSolid from "../assets/heart-solid.svg";

export default function Nav() {
  const { items } = useContext(FavContext);

  return (
    <nav className="arrows">
      <Link to="/">
        <span>&nbsp;&larr; Categories</span>
      </Link>
      <div>
        <img className="navHeart" src={HeartSolid} alt="heart" />
        <span>{items.length}</span>
      </div>
      <Link to="/favourites">
        <span>Favourites &nbsp;&rarr;</span>
      </Link>
    </nav>
  );
}
