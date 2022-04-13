import React, { useState } from "react";
import "./App.css";

import dbCategories from "./fake-data/all-categories";
import dbProducts from "./fake-data/all-products";

import Title from "./components/Title";
import Categories from "./components/Categories";
import Products from "./components/Products";

export default function App() {
  const [products, setProducts] = useState(dbProducts);

  function selectProducts(e) {
    const selectedCategory = e.target.innerText.replace("FAKE: ", "");

    const selectedProducts = dbProducts.filter(
      (product) => product.category === selectedCategory
    );

    setProducts(selectedProducts);
  }

  return (
    <>
      <header>
        <Title />
      </header>
      <nav>
        <Categories
          categoriesToDisplay={dbCategories}
          selectProducts={selectProducts}
        />
      </nav>
      <main>
        <Products ProductsToDisplay={products} />
      </main>
    </>
  );
}
