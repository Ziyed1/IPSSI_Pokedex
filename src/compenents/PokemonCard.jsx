import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import '../styles/PokemonCard.css';
import { Link, useParams } from 'react-router-dom';
import { WishlistContext } from '../contexts/WishListContext';

export default function PokemonCard({ id, image, name, type, showHeartButton = true, showDeleteButton = true }) {
  const { wishlist, addToWishlist, removeFromWishlist, isPokemonInWishlist } = useContext(WishlistContext);
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  
  const handleHeartClick = () => {
    if (isPokemonInWishlist({ id, image, name })) {
      // Afficher une alerte d'erreur car le Pokémon est déjà dans la wishlist
      setShowAlertError(true);
      setTimeout(() => {
        setShowAlertError(false);
      }, 5000);
    } else {
      // Ajouter le Pokémon à la wishlist
      addToWishlist({ id, image, name });
      // Afficher une alerte de succès
      setShowAlertSuccess(true);
      setTimeout(() => {
        setShowAlertSuccess(false);
      }, 5000);
    }
  };

  const handleDeleteClick = () => {
    removeFromWishlist(id);
  };

  const cardColor = () => {
    switch (type) {
      case 'fire':
        return 'card-fire';
      case 'water':
        return 'card-water';
      case 'grass':
        return 'card-grass';
      case 'electric':
        return 'card-electric';
      case 'psychic':
        return 'card-psychic';
      case 'fighting':
        return 'card-fighting';
      case 'ghost':
        return 'card-ghost';
      case 'dragon':
        return 'card-dragon';
      case 'rock':
        return 'card-rock';
      case 'ice':
        return 'card-ice';
      case 'dark':
        return 'card-dark';
      default:
        return 'card-default';
    }
  };

  return (
    <Card className={`pokemon-card ${cardColor()}`} sx={{ display: 'flex' }}>
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
          {showHeartButton && (
            <IconButton onClick={handleHeartClick}>
              <FavoriteBorderIcon sx={{ height: 20, width: 20 }} />
            </IconButton>
          )}
          {showDeleteButton && (
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon sx={{ height: 20, width: 20 }} />
            </IconButton>
          )}
        </Box>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} image={image} />
      {showAlertError && (
  <Alert
    severity="error"
    sx={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999
    }}
  >
    Ce Pokémon est déjà dans votre wishlist !
  </Alert>
)}
{showAlertSuccess && (
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
