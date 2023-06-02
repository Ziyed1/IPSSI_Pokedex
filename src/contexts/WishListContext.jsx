import React, { createContext, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (pokemon) => {
    setWishlist((prevWishlist) => [...prevWishlist, pokemon]);
  };

  const removeFromWishlist = (pokemonId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== pokemonId)
    );
  };
  
  const clearWishlist = () => {
    setWishlist([]);
  };

  const isPokemonInWishlist = (pokemon) =>
    wishlist.some((item) => item.id === pokemon.id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isPokemonInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
