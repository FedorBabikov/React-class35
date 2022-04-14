import React, { useState } from "react";
import "./App.css";

import dbCategories from "./fake-data/all-categories.js";
import dbProducts from "./fake-data/all-products.js";

import Title from "./components/Title.js";
import Categories from "./components/Categories.js";
import Products from "./components/Products.js";

export default function App() {
  const [state, setState] = useState({
    products: dbProducts,
    selectedCategory: null,
  });

  function selectProducts(e) {
    const selectedCategory = e.target.value;
    const selectedCategoryNormalized = selectedCategory.replace("FAKE: ", "");

    const selectedProducts = dbProducts.filter(
      (product) => product.category === selectedCategoryNormalized
    );

    setState({
      products: selectedProducts,
      selectedCategory: selectedCategory,
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
          selectedCategory={state.selectedCategory}
          onClickHandler={selectProducts}
        />
      </nav>
      <main>
        <Products productsToDisplay={state.products} />
      </main>
    </>
  );
}
