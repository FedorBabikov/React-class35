import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal.js";
import FavContext from "../FavContext.js";

import HeartRegular from "../assets/heart-regular.svg";
import HeartSolid from "../assets/heart-solid.svg";

export default function ProductPage() {
  const { items, toggleItem } = useContext(FavContext);
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
          <img
            className="prodHeart"
            src={items.includes(+id) ? HeartSolid : HeartRegular}
            alt="heart"
            onClick={(e) => toggleItem(e, +id)}
          />
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
