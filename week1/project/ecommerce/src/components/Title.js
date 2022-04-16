import React from "react";

export default function Title({ selectedCategory }) {
  return (
    <h1 className="title">
      {`${selectedCategory ? "Our products in category " : "Our products"}`}
      <span>
        {selectedCategory ? selectedCategory.replace("FAKE: ", "") : null}
      </span>
    </h1>
  );
}
