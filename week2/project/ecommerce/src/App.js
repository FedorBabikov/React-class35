import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Title from "./components/Title.js";
import Categories from "./components/Categories.js";
import Products from "./components/Products.js";
import ProductPage from "./components/ProductPage.js";
import Modal from "./components/Modal.js";

export default function App() {
  const [state, setState] = useState({
    categories: [],
    allProducts: [],
    categoryProducts: [],
    category: null,
    isLoading: true,
  });

  useEffect(() => {
    (async function () {
      const APIResponses = await Promise.all([
        fetch("https://fakestoreapi.com/products/categories").then((r) =>
          r.json()
        ),
        fetch("https://fakestoreapi.com/products").then((r) => r.json()),
      ]);

      setState((state) => ({
        ...state,
        categories: APIResponses[0],
        allProducts: APIResponses[1],
        isLoading: false,
      }));
    })();
  }, []);

  useEffect(() => {
    document.title = `Shop: ${
      state.category ? state.category : "all products"
    }`;
  }, [state.category]);

  async function selectProducts({ target }) {
    let selectedCategory = target.dataset.category;
    let selectedProducts = [];

    if (selectedCategory !== state.category) {
      setState((state) => ({
        ...state,
        isLoading: true,
      }));

      selectedProducts = await fetch(
        `https://fakestoreapi.com/products/category/${selectedCategory}`
      ).then((r) => r.json());
    } else {
      selectedCategory = null;
    }

    setState((state) => ({
      ...state,
      category: selectedCategory,
      categoryProducts: selectedProducts,
      isLoading: false,
    }));
  }

  return (
    <Router>
      <header>
        <Title selectedCategory={state.category} />
      </header>
      <nav>
        <Categories
          categoriesToDisplay={state.categories}
          selectedCategory={state.category}
          clickHandler={selectProducts}
        />
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Products productsToDisplay={state.allProducts} />}
            exact
          />
          <Route
            path="/category"
            element={<Products productsToDisplay={state.categoryProducts} />}
          />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      {state.isLoading ? <Modal modalClass="modal showModal" /> : null}
    </Router>
  );
}
