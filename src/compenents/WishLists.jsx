import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

function WishlistPage() {
  const [storedWishlist, setStoredWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setStoredWishlist(storedWishlist);
  }, []);

  const handleDelete = (id) => {
    const updatedWishlist = storedWishlist.filter((pokemon) => pokemon.id !== id);
    setStoredWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className='pokemon-wishlist'>
      <h1>Ma wishlist</h1>
      <div className="pokemon-container">
        {storedWishlist.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            type={pokemon.type}
            showHeartButton={false}
            onDelete={handleDelete}
            />
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
