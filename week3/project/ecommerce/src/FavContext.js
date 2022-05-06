import { createContext, useState } from "react";

const FavContext = createContext();

export function FavProvider({ children }) {
  const [items, setItems] = useState([]);

  const toggleItem = (e, id) => {
    e.preventDefault();

    setItems((currentItems) => {
      if (currentItems.includes(id)) {
        const index = currentItems.indexOf(id);

        return [
          ...currentItems.slice(0, index),
          ...currentItems.slice(index + 1),
        ];
      } else {
        return [...currentItems, id];
      }
    });
  };

  return (
    <FavContext.Provider value={{ items, toggleItem }}>
      {children}
    </FavContext.Provider>
  );
}

export default FavContext;
