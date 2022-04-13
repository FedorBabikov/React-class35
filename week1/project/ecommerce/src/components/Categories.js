import React from "react";
import Category from "./Category";

export default function Categories({ categories, selectProducts }) {
  return (
    <ul className="categories">
      {categories.map((categoryName, index) => (
        <Category
          name={categoryName}
          selectProducts={selectProducts}
          key={index}
        />
      ))}
    </ul>
  );
}
