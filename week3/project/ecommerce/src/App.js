import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import FavContext, { FavProvider } from "./FavContext.js";

import "./App.css";
import Nav from "./components/Nav.js";
import Title from "./components/Title.js";
import Categories from "./components/Categories.js";
import Products from "./components/Products.js";
import ProductPage from "./components/ProductPage.js";
import Modal from "./components/Modal.js";

export default function App() {
  const [state, setState] = useState({
    categories: [],
    category: null,
    allProducts: [],
    catProducts: [],
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

    if (!state.category) {
      setState((state) => ({
        ...state,
        category: JSON.parse(sessionStorage.getItem("category")),
        catProducts: JSON.parse(sessionStorage.getItem("catProducts")),
      }));
    }
  }, [state.category]);

  async function selectProducts({ target }) {
    let isError = false;
    let category = target.dataset.category;
    let catProducts = state.catProducts;

    if (category !== state.category) {
      setState((state) => ({
        ...state,
        isLoading: true,
      }));

      try {
        catProducts = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        ).then((r) => r.json());
      } catch {
        isError = true;
      }
    } else {
      category = null;
    }

    sessionStorage.setItem("category", JSON.stringify(category));
    sessionStorage.setItem("catProducts", JSON.stringify(catProducts));

    setState((state) => ({
      ...state,
      category,
      catProducts,
      isLoading: false,
      isError,
    }));
  }

  return (
    <>
      {state.isError ? (
        <Modal message="Ooops! Couldn't fetch data from server. Refresh the page or try again later" />
      ) : state.isLoading ? (
        <Modal />
      ) : (
        <FavProvider>
          <Router>
            <header>
              <Title selectedCat={state.category} />
            </header>
            <Nav />
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
                <Route
                  path="/favourites"
                  element={<Products favourites={true} />}
                />
              </Routes>
            </main>
          </Router>
        </FavProvider>
      )}
    </>
  );
}
