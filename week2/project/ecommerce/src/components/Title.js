import React from "react";

export default function Title({ selectedCat }) {
  return (
    <h1 className="title">
      {`${
        selectedCat && selectedCat !== "BACK TO ALL"
          ? "Our products in category "
          : "Our products"
      }`}
      <span>{selectedCat !== "BACK TO ALL" ? selectedCat : null}</span>
    </h1>
  );
}
