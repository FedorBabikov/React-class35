import React from "react";

export default function Modal({
  productToDisplay,
  onClickHandler,
  modalClass,
}) {
  return (
    <div className={modalClass}>
      <div className="modalContent">
        <div className="modalProduct">
          <p className="title">{productToDisplay.title}</p>
          <img
            className="image"
            src={productToDisplay.image}
            alt={productToDisplay.title}
          />
          <div className="price">{productToDisplay.price}</div>
          <p className="description">{productToDisplay.description}</p>
        </div>
        <div className="modalButtons">
          <button>BUY</button>
          <button data-product={productToDisplay.id} onClick={onClickHandler}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
