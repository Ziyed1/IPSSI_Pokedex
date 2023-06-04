import React, { createContext, useState } from 'react';

export const WishlistCountContext = createContext();

export const WishlistCountProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);

  return (
    <WishlistCountContext.Provider value={{ wishlistCount, setWishlistCount }}>
      {children}
    </WishlistCountContext.Provider>
  );
};
