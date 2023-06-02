import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Alert from '@mui/material/Alert';
import '../styles/PokemonCard.css';
import { Link } from 'react-router-dom'

export default function PokemonCard({ id, image, name }) {
  const theme = useTheme();
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const [showAlert, setShowAlert] = useState(false);

  const handleHeartClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
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
          <Link to={name}>
            <IconButton>
              <CatchingPokemonIcon sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Link>
          <IconButton onClick={handleHeartClick}>
            <FavoriteBorderIcon sx={{ height: 20, width: 20 }} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} image={image} />
      {showAlert && (
        <Alert
          severity="success"
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999
          }}
        >
          Vous avez ajouté {formattedName} dans votre wishlist ! 
        </Alert>
      )}
    </Card>
  );
}
