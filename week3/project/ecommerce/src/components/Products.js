import React, { useContext } from "react";
import FavContext from "../FavContext.js";
import Product from "./Product.js";

export default function Products({
  productsToDisplay = [],
  favourites = false,
}) {
  const { items } = useContext(FavContext);

  const fetchFavourites = () => {
    let favourites = [];

    if (items.length !== 0) {
      (async () => {
        favourites = await Promise.all(
          items.map((item) =>
            fetch(`https://fakestoreapi.com/products/${item}`).then((r) =>
              r.json()
            )
          )
        );
      })();
    }
    return favourites;
  };

  return (
    <ul className="products">
      {(favourites ? fetchFavourites() : productsToDisplay).map(
        (product, index) => (
          <Product
            productID={product.id}
            title={product.title}
            imageURL={product.image}
            key={index}
          />
        )
      )}
    </ul>
  );
}
