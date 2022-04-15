import React, { useState } from "react";
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

  function selectProducts(e) {
    const prevCategory = state.category;
    let selectedCategory = e.target.dataset.value;
    let selectedProducts = dbProducts;

    if (selectedCategory !== prevCategory) {
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
        <Title />
      </header>
      <nav>
        <Categories
          categoriesToDisplay={dbCategories}
          selectedCategory={state.category}
          onClickHandler={selectProducts}
        />
      </nav>
      <main>
        <Products productsToDisplay={state.products} />
      </main>
    </>
  );
}
