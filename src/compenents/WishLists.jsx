import React, { useContext } from 'react';
import { WishlistContext } from '../contexts/WishListContext';
import PokemonCard from './PokemonCard';

function WishlistPage() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <>
    <h1>Ma wishlist</h1>
        <div className="pokemon-container">
      {wishlist.map((pokemon) => (
        <PokemonCard
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        image={pokemon.image}
        showHeartButton={false}
        />
      ))}
    </div>
    </>

  );
}

export default WishlistPage;
