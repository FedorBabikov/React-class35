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
    isError: false,
  });

  useEffect(() => {
    (async function () {
      let isError = false;
      let APIResponses = [[], []];

      try {
        APIResponses = await Promise.all([
          fetch("https://fakestoreapi.com/products/categories").then((r) =>
            r.json()
          ),
          fetch("https://fakestoreapi.com/products").then((r) => r.json()),
        ]);
      } catch {
        isError = true;
      }

      setState((state) => ({
        ...state,
        categories: APIResponses[0],
        allProducts: APIResponses[1],
        isLoading: false,
        isError,
      }));
    })();
  }, []);

  useEffect(() => {
    document.title = `Shop: ${
      state.category ? state.category : "all products"
    }`;
  }, [state.category]);

  async function selectProducts({ target }) {
    let isError = false;
    let selectedCategory = target.dataset.category;
    let selectedProducts = [];

    if (selectedCategory !== state.category) {
      setState((state) => ({
        ...state,
        isLoading: true,
      }));

      try {
        selectedProducts = await fetch(
          `https://fakestoreapi.com/products/category/${selectedCategory}`
        ).then((r) => r.json());
      } catch {
        isError = true;
      }
    } else {
      selectedCategory = null;
    }

    setState((state) => ({
      ...state,
      category: selectedCategory,
      categoryProducts: selectedProducts,
      isLoading: false,
      isError,
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
      {state.isLoading === true && <Modal />}
      {state.isError === true && (
        <Modal message="Something bad happened: couldn't fetch the data from server" />
      )}
    </Router>
  );
}
