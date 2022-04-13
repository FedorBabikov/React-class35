import React, { useState } from "react";
import "./App.css";

import dbCategories from "./fake-data/all-categories";
import dbProducts from "./fake-data/all-products";

import Header from "./components/Header";
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
      <Header />
      <Categories categories={dbCategories} selectProducts={selectProducts} />
      <Products ProductsToDisplay={products} />
    </>
  );
}
