import React, { useState } from 'react';
import '../styles/PokemonDetails.css';
import { useParams } from 'react-router-dom'
import { useQuery } from "react-query"

const typeClassMapping = {
  fire: 'card-fire',
  water: 'card-water',
  grass: 'card-grass',
  electric: 'card-electric',
  psychic: 'card-psychic',
  fighting: 'card-fighting',
  ghost: 'card-ghost',
  dragon: 'card-dragon',
  rock: 'card-rock',
  ice: 'card-ice',
  dark: 'card-dark',
  flying: 'card-flying',
  bug: 'card-bug',
  poison: 'card-poison',
  ground: 'card-ground',
};

export default function PokemonDetails() {
  const { slug } = useParams();
  const [showShinySprite, setShowShinySprite] = useState(false);

  // Fetch API 

  const { isLoading, error, data } = useQuery('pokemon', async () =>
  await fetch('https://pokeapi.co/api/v2/pokemon/' + slug).then((res) =>
    res.json()
  )
  
);

  const {
    isLoading: speciesLoading,
    error: speciesError,
    data: speciesData,
  } = useQuery('species', async() =>
    await fetch('https://pokeapi.co/api/v2/pokemon-species/' + slug).then((res) =>
      res.json()
    )
  );

  if (isLoading || speciesLoading) {
    return 'Loading...';
  }
  if (error || speciesError) {
    return error.message || speciesError.message;
  }

  const types = data.types.map((typeData) => {
    const typeName = typeData.type.name;
    return typeName.charAt(0).toUpperCase() + typeName.slice(1);
  });

  const formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const typeClassName = data.types[0].type.name; // Utilise le premier type pour déterminer la classe CSS
  const pokemonClass = typeClassMapping[typeClassName] || 'card-default';

  let spriteUrl = data.sprites.other.home.front_default;
  if (showShinySprite) {
    spriteUrl = data.sprites.other.home.front_shiny;
  }

  const toggleShinySprite = () => {
    setShowShinySprite((prevShowShinySprite) => !prevShowShinySprite);
  };

  return (
    <div className="pokemon-details-container">
      <div className={`pokemon-details ${pokemonClass}`}>
        <div className="pokemon-info">
          <div className="pokemon-header">
            <h1 className="pokemon-id">#{data.id} - {formattedName}</h1>
            <h2> {speciesData.genera[7].genus}</h2>
            <h3> </h3>
          </div>
          <div className="pokemon-image">
            <img src={spriteUrl} alt={formattedName} />
            <button className="shiny-toggle" onClick={toggleShinySprite}>
              {showShinySprite ? 'Normal' : 'Chromatique'}
            </button>
          </div>
        </div>
        <div className="pokemon-details-section">
          <div className="pokemon-types">
            <h3>Types:</h3>
            <ul className="types" >
              {types.map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>
          <div className="pokemon-stats">
            <h3>Stats:</h3>
            <ul>
              {data.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="pokemon-abilities">
            <h3>Abilities:</h3>
            <ul>
              {data.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
