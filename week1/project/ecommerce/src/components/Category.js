import React from "react";

export default function Category({ catName, catClass, onClickHandler }) {
  return (
    <li className="category">
      <button
        className={catClass}
        data-value={catName}
        onClick={onClickHandler}
      >
        {catName}
      </button>
    </li>
  );
}
