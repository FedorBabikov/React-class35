import React from "react";

export default function Modal({ productToDisplay, modalClass, clickHandler }) {
  return (
    <div
      className={modalClass}
      data-product={productToDisplay.id}
      onClick={clickHandler}
    >
      <div className="modalContent">
        <div className="modalProduct">
          <p className="title">{productToDisplay.title}</p>
          <img
            className="image"
            src={productToDisplay.image}
            alt={productToDisplay.title}
          />
          <div className="price">{`Euro ${productToDisplay.price}`}</div>
          <p className="description">{productToDisplay.description}</p>
        </div>
        <div className="modalButtons">
          <button className="button cta">BUY</button>
          <button
            className="button"
            data-product={productToDisplay.id}
            onClick={clickHandler}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
