import React from "react";

export default function Title({ selectedCategory }) {
  return (
    <h1 className="title">
      {`${
        selectedCategory !== null && selectedCategory !== "BACK TO ALL"
          ? "Our products in category "
          : "Our products"
      }`}
      <span>
        {selectedCategory !== "BACK TO ALL" ? selectedCategory : null}
      </span>
    </h1>
  );
}
