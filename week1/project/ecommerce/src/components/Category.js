import React from "react";

export default function Category({ name, selectProducts }) {
  return (
    <li className="category" onClick={selectProducts}>
      <button className="categoryBtn">{name}</button>
    </li>
  );
}
