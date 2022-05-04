import React from "react";
import { Link } from "react-router-dom";

export default function Category({ name, className, clickHandler }) {
  return (
    <li className="category">
      <Link to={className.includes("clicked") ? "/" : "/category"}>
        <button className={className} onClick={clickHandler}>
          {name}
        </button>
      </Link>
    </li>
  );
}
