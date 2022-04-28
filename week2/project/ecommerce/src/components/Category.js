import React from "react";
import { Link } from "react-router-dom";

export default function Category({ catName, catClass, clickHandler }) {
  return (
    <li className="category">
      <Link to={catClass.includes("clicked") ? "/" : "/category"}>
        <button
          className={catClass}
          data-category={catName}
          onClick={clickHandler}
        >
          {catName}
        </button>
      </Link>
    </li>
  );
}
