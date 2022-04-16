import React, { useState } from "react";
import Product from "./Product.js";
import Modal from "./Modal.js";

export default function Products({ productsToDisplay }) {
  const [state, setState] = useState({
    productID: null,
    modalClass: "modal",
  });

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

  function toggleModal(e) {
    setState({
      productID: +e.target.dataset.product,
      modalClass: `${
        state.modalClass === "modal" ? "modal showModal" : "modal"
      }`,
    });
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
