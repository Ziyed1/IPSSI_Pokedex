import PokemonCard from './compenents/PokemonCard';
import React, { useEffect, useState } from 'react';
import './styles/App.css';

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [value, setValue] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState(allPokemons);

  const getAllPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
    const data = await res.json();

    function createPokemon(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();
        setAllPokemons((Liste) => [...Liste, data]);
      });
    }
    createPokemon(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <>
        <div className="pokemon-container">
          {allPokemons.map((pokemonStats, index) => (
            <PokemonCard
              key={index}
              id={pokemonStats.id}
              name={pokemonStats.name}
              image={pokemonStats.sprites.other.home.front_default}
              type={pokemonStats.types[0].type.name}
              showDeleteButton={false}
            />
          ))}
        </div>
    </>

  );
}

export default App;
