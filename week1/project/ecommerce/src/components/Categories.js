import React from "react";
import Category from "./Category.js";

export default function Categories({
  categoriesToDisplay,
  selectedCategory,
  clickHandler,
}) {
  return (
    <ul className="categories">
      {categoriesToDisplay.map((categoryName, index) => (
        <Category
          catName={categoryName}
          catClass={`button${
            categoryName === selectedCategory ? " clicked" : ""
          }`}
          clickHandler={clickHandler}
          key={index}
        />
      ))}
    </ul>
  );
}
