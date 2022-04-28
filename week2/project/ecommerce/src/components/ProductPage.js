import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal.js";

export default function ProductPage() {
  const { id } = useParams();

  const [state, setState] = useState({
    product: {},
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    let isError = false;
    let product = {};

    (async function () {
      try {
        product = await fetch(`https://fakestoreapi.com/products/${id}`).then(
          (r) => r.json()
        );
      } catch {
        isError = true;
      }
      setState((state) => ({
        ...state,
        product,
        isError,
        isLoading: false,
      }));
    })();
  }, [id]);

  return (
    <>
      <div className="product">
        <img
          className="productImg"
          src={state.product.image}
          alt={state.product.title}
        />
        <p className="productName">{state.product.description}</p>
        <p>
          Euro <strong>{state.product.price}</strong>
        </p>
      </div>

      {state.isLoading === true && <Modal />}
      {state.isError === true && (
        <Modal message="Something bad happened: couldn't fetch the data from server" />
      )}
    </>
  );
}
