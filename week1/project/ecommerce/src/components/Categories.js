import React from "react";
import Category from "./Category";

export default function Categories({ categoriesToDisplay, selectProducts }) {
  return (
    <ul className="categories">
      {categoriesToDisplay.map((categoryName, index) => (
        <Category
          name={categoryName}
          selectProducts={selectProducts}
          key={index}
        />
      ))}
    </ul>
  );
}
