import React from "react";

export default function Category({ catName, catClass, clickHandler }) {
  return (
    <li className="category">
      <button
        className={catClass}
        data-category={catName}
        onClick={clickHandler}
      >
        {catName}
      </button>
    </li>
  );
}
