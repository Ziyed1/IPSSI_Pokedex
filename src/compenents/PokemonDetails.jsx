import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from "react-query";
import { Container, Box } from '@mui/material';
import '../styles/PokemonDetails.css';



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
    <Container class="pokemon_container" sx={{ display: 'flex'}}>
          <Box class="pokemon_main_box " sx={{ display: 'flex'}}>
            {/* Pokemon bar */}

            <Box class="pokemon_box">
              <div className="pokemon_data data_name">
                #{data.id} {formattedName}
              </div>
              <Box component="img"
              class="pokemon_img"
                sx={{
                  height: 200,
                  width: 200,
                }}
                src={data.sprites.other.home.front_default}>

              </Box>
              <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div className="pokemon_data">
                  Type : {types}
                </div>
                <div className="pokemon_data">
                Taille {data.height}m / Poids : {data.weight}kg
                </div>
              </Box>
            </Box>
            <div>
                test
              </div>
          </Box>
    </Container>
  )
    
}
