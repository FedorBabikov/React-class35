import React, { useEffect, useRef } from "react";
import Category from "./Category.js";

export default function Categories({ categories, selectedCat, clickHandler }) {
  const navRef = useRef(null);

  useEffect(() => {
    let maxWidth = 0;

    for (const liElem of navRef.current.children) {
      const liWidth = liElem.offsetWidth;
      if (liWidth > maxWidth) maxWidth = liWidth;
    }

    for (const liElem of navRef.current.children) {
      liElem.style.width = `${maxWidth}px`;
    }
  });

  return (
    <ul ref={(thisUL) => (navRef.current = thisUL)} className="categories">
      {categories.map((catName, index) => (
        <Category
          name={catName === selectedCat ? "BACK TO ALL" : catName}
          className={`button${catName === selectedCat ? " clicked" : ""}`}
          clickHandler={clickHandler}
          key={index}
        />
      ))}
    </ul>
  );
}
