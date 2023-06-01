import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../styles/PokemonCard.css'

export default function PokemonCard({ id, image, name }) {
  const theme = useTheme();
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  const handleHeartClick = () => {
    // Logique de gestion du clic sur le cœur
  };

  return (
    <Card className="pokemon-card" sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {formattedName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            #{id}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton onClick={handleHeartClick}>
            <CatchingPokemonIcon sx={{ height: 20, width: 20 }} />
          </IconButton>
          <IconButton>
            <FavoriteBorderIcon sx={{ height: 20, width: 20 }} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} image={image} />
    </Card>
  );
}
