import React, { useState } from "react";
import Product from "./Product.js";
import Modal from "./Modal.js";

export default function Products({ productsToDisplay }) {
  const [state, setState] = useState({
    productID: null,
    modalClass: "modal",
  });

  // if no product selected - set modal empty, otherwise - send it the selected one
  const modalContent = (state.productID &&
    productsToDisplay.find((product) => product.id === state.productID)) || {
    id: null,
    title: null,
    price: null,
    description: null,
    category: null,
    image: null,
    rating: null,
  };

  // only gets invoked when these are clicked: prod card, modal `close` btn, the grey zone outside open modal
  function toggleModal(e) {
    if (e.target.dataset.product) {
      setState({
        productID: e.target.classList.contains("product")
          ? +e.target.dataset.product
          : null,
        modalClass: `${
          state.modalClass === "modal" ? "modal showModal" : "modal"
        }`,
      });
    }
  }

  return (
    <>
      <ul className="products">
        {productsToDisplay.map((product, index) => (
          <Product
            productID={product.id}
            title={product.title}
            imageURL={product.image}
            clickHandler={toggleModal}
            key={index}
          />
        ))}
      </ul>
      <Modal
        productToDisplay={modalContent}
        modalClass={state.modalClass}
        clickHandler={toggleModal}
      />
    </>
  );
}
