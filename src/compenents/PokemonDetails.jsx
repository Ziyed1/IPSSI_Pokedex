import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from "react-query";


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
  return (
    <div> {data.name} </div>
  )
}