import React, { useState, useEffect } from "react";
import "./App.css";

import dbCategories from "./fake-data/all-categories.js";
import dbProducts from "./fake-data/all-products.js";

import Title from "./components/Title.js";
import Categories from "./components/Categories.js";
import Products from "./components/Products.js";

export default function App() {
  const [state, setState] = useState({
    category: null,
    products: dbProducts,
  });

  // Page title depends on whether some category is selected or not
  useEffect(() => {
    document.title = `Shop: ${
      state.category ? state.category.replace("FAKE: ", "") : "ALL"
    }`;
  });

  // gets invoked when a btn is clicked
  // take: prev cat - from state, selected cat - from the btn, all products - from DB
  // then, in state, change either category or set of products to display
  // then, re-render the component
  function selectProducts(e) {
    let selectedCategory = e.target.dataset.category;
    let selectedProducts = dbProducts;

    if (selectedCategory !== state.category) {
      const selectedCategoryNormalized = selectedCategory.replace("FAKE: ", "");

      selectedProducts = dbProducts.filter(
        (product) => product.category === selectedCategoryNormalized
      );
    } else {
      selectedCategory = null;
    }

    setState({
      category: selectedCategory,
      products: selectedProducts,
    });
  }

  return (
    <>
      <header>
        <Title selectedCategory={state.category} />
      </header>
      <nav>
        <Categories
          categoriesToDisplay={dbCategories}
          selectedCategory={state.category}
          clickHandler={selectProducts}
        />
      </nav>
      <main>
        <Products productsToDisplay={state.products} />
      </main>
    </>
  );
}
