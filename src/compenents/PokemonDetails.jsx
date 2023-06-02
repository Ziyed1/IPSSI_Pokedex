import React from 'react';
import '../styles/PokemonDetails.css';
import { useParams } from 'react-router-dom'
import { useQuery } from "react-query"

export default function PokemonDetails() {
  const { slug } = useParams();

  const { isLoading, error, data } = useQuery("pokemon", () =>
    fetch("https://pokeapi.co/api/v2/pokemon/" + slug).then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return error.message;
  }

  const types = data.types.map((typeData) => {
    const typeName = typeData.type.name;
    return typeName.charAt(0).toUpperCase() + typeName.slice(1);
  });

  const formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  return (
    <div className="pokemon-details-container">
      <div className="pokemon-details">
        <div className="pokemon-info">
          <div className="pokemon-header">
          <h1 className="pokemon-id">#{data.id} {formattedName}</h1>
          </div>
          <div className="pokemon-image">
            <img src={data.sprites.other.home.front_default} alt={formattedName} />
          </div>
        </div>
        <div className="pokemon-details-section">
          <div className="pokemon-types">
            <h3>Types:</h3>
            <ul>
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
