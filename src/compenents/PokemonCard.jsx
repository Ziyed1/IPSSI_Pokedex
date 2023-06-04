import React, { useState, useEffect, useContext } from 'react';
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
import { Link } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { WishlistCountContext } from '../context/WishlistContext'


export default function PokemonCard({ id, image, name, type, showHeartButton = true, showDeleteButton = true, onDelete }) {
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const { searchValue } = useContext(SearchContext);
  const { setWishlistCount } = useContext(WishlistCountContext)

  useEffect(() => {
    let timerId;

    if (alertType && alertMessage) {
      timerId = setTimeout(() => {
        setAlertType(null);
        setAlertMessage('');
      }, 2000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [alertType, alertMessage]);

  const handleHeartClick = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const isPokemonInWishlist = wishlist.some(pokemon => pokemon.id === id);


    if (isPokemonInWishlist) {
      setAlertType('error');
      setAlertMessage('Ce Pokémon est déjà dans votre wishlist !');
    } else {
      const newPokemon = { id, image, name, type };
      wishlist.push(newPokemon);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));

      setWishlistCount(wishlist.length);

      setAlertType('success');
      setAlertMessage(`Vous avez ajouté ${formattedName} dans votre wishlist !`);
    }
  };

  const handleDeleteClick = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    onDelete(id);
    setWishlistCount(wishlist.length - 1);
    setAlertType('error');
    setAlertMessage(`Vous avez supprimé ${formattedName} de votre wishlist.`);
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
      case 'bug':
        return 'card-bug';
      case 'flying':
        return 'card-flying'
      case 'poison':
        return 'card-poison'
      case 'ground':
        return 'card-ground'
      default:
        return 'card-default';
    }
  };

  if (searchValue && !formattedName.toLowerCase().includes(searchValue.toLowerCase())) {
    return null;
  }

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
      {alertType && (
        <Alert
          severity={alertType}
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999
          }}
        >
          {alertMessage}
        </Alert>
      )}
    </Card>
  );
}
