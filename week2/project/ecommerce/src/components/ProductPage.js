import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal.js";

export default function ProductPage() {
  const { id } = useParams();

  const [state, setState] = useState({
    product: {},
    isError: false,
    isLoading: true,
  });

  useEffect(() => {
    let product = {};
    let isError = false;

    (async function () {
      try {
        product = await fetch(`https://fakestoreapi.com/products/${id}`).then(
          (r) => r.json()
        );
      } catch {
        isError = true;
      }

      setState({
        product,
        isError,
        isLoading: false,
      });
    })();
  }, [id]);

  return (
    <>
      {state.isError ? (
        <Modal message="Ooops! Error: couldn't fetch data from server" />
      ) : state.isLoading ? (
        <Modal />
      ) : (
        <div className="product">
          <p className="prodTitle">{state.product.title}</p>
          <img
            className="prodImg"
            src={state.product.image}
            alt={state.product.title}
          />
          <p className="prodPrice">
            Euro <strong>{state.product.price}</strong>
          </p>
          <p className="prodDesc">{state.product.description}</p>
        </div>
      )}
    </>
  );
}
