import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Title from "./components/Title.js";
import Categories from "./components/Categories.js";
import Products from "./components/Products.js";
import ProductPage from "./components/ProductPage.js";
import Modal from "./components/Modal.js";

export default function App() {
  const catProducts = sessionStorage.getItem("allProducts")
    ? JSON.parse(sessionStorage.getItem("catProducts"))
    : [];

  const [state, setState] = useState({
    categories: [],
    category: null,
    allProducts: [],
    catProducts: catProducts,
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

      sessionStorage.setItem("allProducts", APIResponses[1]);
    })();

    return () => {
      sessionStorage.removeItem("allProducts");
    };
  }, []);

  useEffect(() => {
    document.title = `Shop: ${
      state.category && state.category !== "BACK TO ALL"
        ? state.category
        : "all products"
    }`;
  }, [state.category]);

  async function selectProducts({ target }) {
    let isError = false;
    let selectedCat = target.innerHTML;
    let catProducts = [];

    if (selectedCat !== state.category) {
      setState((state) => ({
        ...state,
        isLoading: true,
      }));

      try {
        catProducts = await fetch(
          `https://fakestoreapi.com/products/category/${selectedCat}`
        ).then((r) => r.json());
      } catch {
        isError = true;
      }
    } else {
      selectedCat = null;
    }

    sessionStorage.setItem("catProducts", JSON.stringify(catProducts));

    setState((state) => ({
      ...state,
      category: selectedCat,
      catProducts,
      isLoading: false,
      isError,
    }));
  }

  return (
    <>
      {state.isError ? (
        <Modal message="Ooops! Error: couldn't fetch data from server" />
      ) : state.isLoading ? (
        <Modal />
      ) : (
        <Router>
          <header>
            <Title selectedCat={state.category} />
          </header>
          <nav>
            <Categories
              categories={state.categories}
              selectedCat={state.category}
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
                element={<Products productsToDisplay={state.catProducts} />}
              />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </main>
        </Router>
      )}
    </>
  );
}
