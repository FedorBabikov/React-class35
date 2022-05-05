import React from "react";
import { Link } from "react-router-dom";

export default function Category({
  name,
  currentName,
  className,
  clickHandler,
}) {
  return (
    <li className="category">
      <Link to={className.includes("clicked") ? "/" : "/category"}>
        <button
          data-category={name}
          className={className}
          onClick={clickHandler}
        >
          {currentName}
        </button>
      </Link>
    </li>
  );
}
