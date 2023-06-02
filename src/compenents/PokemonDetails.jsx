import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from "react-query";
import '../styles/PokemonDetails.css'


export default function PokemonDetails() {
    const { slug }  = useParams();      

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
    <div className="pokemon_container"> 
      <div className="pokemon_main_box">
        <div className="pokemon_box">
          <div className="pokemon_data data_name">
                <h3>#{data.id} {formattedName}</h3>
                <img src={data.sprites.other.home.front_default} alt={data.name} />
                <span class="pokemon_data">  Type : {types}</span>
                <span class="pokemon_data">   Taille {data.height}m / Poids : {data.weight}kg</span>
          </div>
        </div>
      </div>
    </div>
  )
}