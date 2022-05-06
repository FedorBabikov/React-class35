import React, { useState, useEffect, useContext } from "react";
import FavContext from "../FavContext.js";
import Product from "./Product.js";

export default function Products({
  productsToDisplay = [],
  favourites = false,
}) {
  const [favToDisplay, setFavToDisplay] = useState([]);

  const { items } = useContext(FavContext);

  useEffect(() => {
    if (items.length !== 0) {
      (async function () {
        const res = await Promise.all(
          items.map((item) =>
            fetch(`https://fakestoreapi.com/products/${item}`).then((r) =>
              r.json()
            )
          )
        );

        setFavToDisplay(res);
      })();
    } else {
      setFavToDisplay([]);
    }
  }, [items]);

  return (
    <ul className="products">
      {(favourites ? favToDisplay : productsToDisplay).map((product, index) => (
        <Product
          productID={product.id}
          title={product.title}
          imageURL={product.image}
          key={index}
        />
      ))}
    </ul>
  );
}
