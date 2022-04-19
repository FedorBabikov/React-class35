import React, { useEffect } from "react";
import Category from "./Category.js";

export default function Categories({
  categoriesToDisplay,
  selectedCategory,
  clickHandler,
}) {
  // make all menu buttons always the same size - the size of the longest category name
  //take them all from DOM after re-render -> find the widest -> then put that value back to a DOM variable to use in CSS
  // set their parent as grid: `grid-template-columns: repeat(auto-fit, var(--btn_width));`
  useEffect(() => {
    let sharedWidth = 0;

    const catButtons = document.querySelectorAll(".category .button");

    for (const button of catButtons) {
      const buttonWidth = button.offsetWidth;
      if (buttonWidth > sharedWidth) sharedWidth = buttonWidth;
    }

    document
      .getElementById("root")
      .style.setProperty("--btn_width", `${sharedWidth}px`);
  });

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
